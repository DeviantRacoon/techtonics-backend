type CriteriaHandlerParams = {
  params: Record<string, unknown>;
  allowedKeys?: string[];
  relationKeys?: string[];
};

type PrismaQuery = {
  where: Record<string, unknown>;
  include: Record<string, unknown>;
};

export default function criterialHandler({
  params,
  allowedKeys,
  relationKeys,
}: CriteriaHandlerParams): PrismaQuery {
  const where: Record<string, unknown> = {};
  const include: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue; 

    if (key.includes(':')) {
      handleRelationFilter(key, value, where, include);
    } else if (relationKeys && relationKeys.some((relation) => key.startsWith(relation))) {
      buildNestedInclude(key, include);
    } else if (allowedKeys && allowedKeys.includes(key)) {
      Object.assign(where, buildWhereCondition(key, value));
    }
  }

  return { where, include };
}

function handleRelationFilter(
  key: string,
  value: any,
  where: Record<string, any>,
  include: Record<string, any>
) {
  const parts = key.split(':');
  
  if (parts.length === 2) {
    const relation = parts[0];
    const field = parts[1];

    if (!where[relation]) {
      where[relation] = { some: {} };
    }
    where[relation].some[field] = parseValue(value);
  } else if (parts.length > 2) {
    const relation = parts[0];
    const nestedField = parts.slice(1).join('.');

    if (!include[relation]) {
      include[relation] = { include: {} };
    }

    buildNestedInclude(nestedField, include[relation].include);
  }
}

function buildWhereCondition(key: string, value: any): Record<string, any> {
  if (typeof value === 'string') {
    return value.startsWith('!')
      ? { [key]: { not: parseValue(value.slice(1)) } }
      : value.includes('%')
        ? { [key]: { contains: value.replace('%', '') } }
        : { [key]: parseValue(value) };
  } else if (Array.isArray(value)) {
    return { [key]: { in: value } };
  } else if (typeof value === 'object') {
    return { [key]: { ...value } };
  }
  return { [key]: parseValue(value) };
}

function buildNestedInclude(key: string, include: Record<string, any>) {
  key.split('.').reduce((acc, part, index, arr) => {
    if (index === arr.length - 1) {
      acc[part] = true;
    } else {
      acc[part] = acc[part] || { include: {} };
    }
    return acc[part].include;
  }, include);
}

function parseValue(value: any): any {
  if (typeof value === 'string' && /^\d+$/.test(value) && value.length < 10) {
    return parseInt(value, 10);
  }
  return value;
}
