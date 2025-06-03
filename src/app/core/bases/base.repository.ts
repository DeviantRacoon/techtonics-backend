import AppDataSource from '@config/typeorm';

import { ObjectLiteral, Repository, DataSource, QueryRunner } from 'typeorm';
import { QueryBuilderCriteriaAdapter } from '@handlers/criterial.handler';
import { paginateWithQueryBuilder } from '@handlers/paginate.handler';

interface QueryBuilderSearchOptions {
  filters?: Record<string, any>;
  page: number;
  limit: number;
  orderBy: 'ASC' | 'DESC';
}

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;
  protected readonly alias: string;
  protected readonly dataSource: DataSource;
  protected joinConfig: Record<string, 'inner' | 'left'> = {};

  constructor(entity: { new(): T }, alias: string) {
    this.dataSource = AppDataSource;
    this.repository = this.dataSource.getRepository(entity);
    this.alias = alias;
  }

  async findAllByParams(
    options: QueryBuilderSearchOptions & { forceJoins?: string[] }
  ) {
    const qb = this.repository.createQueryBuilder(this.alias);
    const { conditions, joins } = QueryBuilderCriteriaAdapter.parse(options.filters || {}, this.alias);

    const allJoins = new Set([...joins, ...(options.forceJoins || [])]);

    this.applyJoins(qb, allJoins);
    this.applyConditions(qb, conditions);

    return paginateWithQueryBuilder(qb, {
      page: options.page,
      limit: options.limit,
      orderBy: options.orderBy,
    });
  }


  async findOneByParams(filters: Record<string, any>): Promise<T | null> {
    const qb = this.repository.createQueryBuilder(this.alias);
    const { conditions, joins } = QueryBuilderCriteriaAdapter.parse(filters, this.alias);

    this.applyJoins(qb, joins);
    this.applyConditions(qb, conditions);

    return qb.getOne();
  }

  async runInTransaction<T>(fn: (manager: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await fn(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async runRawQuery<T = any>(sql: string, params?: any[]): Promise<T[]> {
    return this.dataSource.query(sql, params);
  }

  async runRawQueryInTransaction<T = any>(queryRunner: QueryRunner, sql: string, params?: any[]): Promise<T[]> {
    return queryRunner.query(sql, params);
  }

  private applyJoins(qb: any, joins: Set<string>) {
    const joined = new Set<string>();
    for (const joinPath of joins) {
      const pathParts = joinPath.split('.');
      let currentAlias = this.alias;
      let currentPath = '';

      for (const part of pathParts) {
        currentPath = currentPath ? `${currentPath}.${part}` : part;
        const joinAlias = `${currentAlias}_${part}`;
        const fullJoinPath = `${currentAlias}.${part}`;

        if (!joined.has(joinAlias)) {
          const joinType = this.joinConfig?.[currentPath] ?? 'inner';
          if (joinType === 'left') {
            qb.leftJoinAndSelect(fullJoinPath, joinAlias);
          } else {
            qb.innerJoinAndSelect(fullJoinPath, joinAlias);
          }
          joined.add(joinAlias);
        }

        currentAlias = joinAlias;
      }
    }
  }

  private applyConditions(qb: any, conditions: any[]) {
    for (const condition of conditions) {
      const expr = `${condition.alias}.${condition.property} ${condition.operator} :${condition.parameterKey}`;
      if (!qb.expressionMap.wheres.length) {
        qb.where(expr, { [condition.parameterKey]: condition.value });
      } else {
        qb.andWhere(expr, { [condition.parameterKey]: condition.value });
      }
    }
  }
}
