import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

interface PaginationOptions {
  page?: number;
  limit?: number;
  orderBy?: 'ASC' | 'DESC';
}

export async function paginateWithQueryBuilder<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  options: PaginationOptions
): Promise<{
  data: T[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}> {
  const { page, limit, orderBy = 'DESC' } = options;

  qb.orderBy(`${qb.alias}.createdAt`, orderBy);

  let data: T[];
  let total: number;

  if (page && limit) {

    qb.skip((page - 1) * limit).take(limit);
    [data, total] = await qb.getManyAndCount();
  } else {
    data = await qb.getMany();
    total = data.length;
  }

  return {
    data,
    total,
    ...(page && limit
      ? {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
      : {}),
  };
}
