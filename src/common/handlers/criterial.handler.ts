type CriteriaHandlerParams = {
  params: Record<string, any>;
  allowedKeys: string[];
  relationKeys?: string[];
};

type PrismaQuery = {
  where: Record<string, any>;
  include: Record<string, any>;
};

export default function criterialHandler({
  params,
  allowedKeys,
  relationKeys = [],
}: CriteriaHandlerParams): PrismaQuery {
  const where: Record<string, any> = {};
  const include: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;

    const isRelationKey = relationKeys.some((relation) => key.startsWith(relation));
    if (isRelationKey) {
      buildNestedInclude(key, include, relationKeys);
    } else if (allowedKeys.includes(key)) {
      Object.assign(where, buildWhereCondition(key, value));
    }
  });

  return { where, include };
}

function buildWhereCondition(key: string, value: any): Record<string, any> {
  if (typeof value === 'string') {
    if (value.startsWith('!')) {
      return { [key]: { not: parseValue(value.slice(1)) } };
    } else if (value.includes('%')) {
      return { [key]: { contains: value.replace('%', '') } };
    }
  } else if (Array.isArray(value)) {
    return { [key]: { in: value } };
  } else if (typeof value === 'object') {
    return { [key]: { ...value } }; 
  }

  return { [key]: parseValue(value) };
}

function buildNestedInclude(key: string, include: Record<string, any>, relationKeys: string[]) {
  const keys = key.split('.');
  let currentInclude = include;

  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      currentInclude[k] = true; 
    } else {
      currentInclude[k] = currentInclude[k] || { include: {} };
      currentInclude = currentInclude[k].include;
    }
  });
}

function parseValue(value: any): any {
  return !isNaN(value) && value.length < 10 ? parseInt(value, 10) : value;
}
