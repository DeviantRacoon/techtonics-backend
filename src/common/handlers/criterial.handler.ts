interface QueryBuilderCondition {
  alias: string;
  property: string;
  operator: string;
  parameterKey: string;
  value: any;
}

export class QueryBuilderCriteriaAdapter {
  static parse(
    filters: Record<string, any>,
    rootAlias: string
  ): { conditions: QueryBuilderCondition[]; joins: Set<string> } {

    const conditions: QueryBuilderCondition[] = [];
    const joins = new Set<string>();

    for (const [rawKey, rawValue] of Object.entries(filters)) {
      const { path, operator } = this.extractOperator(rawKey);
      const parts = path.split('.');
      const isNested = parts.length > 1;

      const alias = isNested ? parts.slice(0, -1).join('_') : rootAlias;
      const joinPath = isNested ? parts.slice(0, -1).join('.') : '';
      const property = parts[parts.length - 1];

      if (joinPath) joins.add(joinPath);

      const parameterKey = `${alias}_${property}`;
      const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;

      conditions.push({
        alias,
        property,
        operator,
        parameterKey,
        value
      });
    }

    return { conditions, joins };
  }

  private static extractOperator(key: string): { path: string; operator: string } {
    const match = key.match(/(.+?)(!?=|>=|<=|>|<|~|@between|@in)?$/);
    const [, path, op = '='] = match ?? [];

    const operatorMap: Record<string, string> = {
      '=': '=',
      '!=': '!=',
      '>': '>',
      '>=': '>=',
      '<': '<',
      '<=': '<=',
      '~': 'ILIKE',
      '@between': 'BETWEEN',
      '@in': 'IN'
    };

    return { path, operator: operatorMap[op] ?? '=' };
  }
}
