/**
 * @fileoverview Utilidad para generar consultas dinámicas en Prisma basadas en filtros y relaciones.
 * @module PrismaCriteriaHandler
 */

type CriteriaHandlerParams = {
  params: Record<string, any>;
  allowedKeys?: string[];
  relationKeys?: string[];
};

type PrismaQuery = {
  where: Record<string, any>;
  include: Record<string, any>;
};

/**
 * Construye dinámicamente los filtros (`where`) y relaciones (`include`) para Prisma.
 * 
 * @param {CriteriaHandlerParams} options - Opciones de configuración.
 * @returns {PrismaQuery} - Consulta Prisma con filtros y relaciones.
 */
export default function criteriaHandler({ params, allowedKeys, relationKeys }: CriteriaHandlerParams): PrismaQuery {
  const where = new Map<string, any>();
  const include = new Map<string, any>();

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

    if (key.includes(':')) {
      processRelationFilter(key, value, where, include);
    } else if (relationKeys?.some(relation => key.startsWith(relation))) {
      processNestedInclude(key, include);
    } else if (allowedKeys?.includes(key)) {
      where.set(key, buildWhereCondition(value));
    }
  }

  return {
    where: Object.fromEntries(where),
    include: Object.fromEntries(include),
  };
}

/**
 * Procesa un filtro de relación y lo agrega al objeto `where` o `include`.
 * 
 * @param {string} key - Clave en formato `relacion:campo`.
 * @param {any} value - Valor del filtro.
 * @param {Map<string, any>} where - Objeto where de Prisma.
 * @param {Map<string, any>} include - Objeto include de Prisma.
 */
function processRelationFilter(
  key: string,
  value: any,
  where: Map<string, any>,
  include: Map<string, any>
) {
  const parts = key.split(':');
  if (parts.length !== 2) return;

  const [relation, field] = parts;
  const relationWhere = where.get(relation) ?? { some: {} };

  relationWhere.some[field] = parseValue(value);
  where.set(relation, relationWhere);
}

/**
 * Construye un objeto `include` para relaciones anidadas en Prisma.
 * 
 * @param {string} key - Clave en formato `relacion.subrelacion`.
 * @param {Map<string, any>} include - Objeto include de Prisma.
 */
function processNestedInclude(key: string, include: Map<string, any>) {
  const parts = key.split('.');
  let currentInclude = include;

  for (const part of parts) {
    if (!currentInclude.has(part)) {
      currentInclude.set(part, new Map([["include", new Map()]]));
    }
    currentInclude = currentInclude.get(part)!.get("include");
  }
}

/**
 * Construye una condición `where` en base a diferentes formatos de valor.
 * 
 * @param {any} value - Valor del filtro.
 * @returns {object} - Objeto de filtro Prisma.
 */
function buildWhereCondition(value: any): Record<string, any> {
  if (typeof value === "string") {
    if (value.startsWith("!")) return { not: parseValue(value.slice(1)) };
    if (value.includes("%")) return { contains: value.replace("%", "") };
    return { equals: parseValue(value) };
  }

  if (Array.isArray(value)) return { in: value };
  if (typeof value === "object") return { ...value };

  return { equals: parseValue(value) };
  // 2411111800
  // chekohat@gmail.com
}

/**
 * Convierte valores en su formato correcto según el contexto de Prisma.
 * 
 * @param {any} value - Valor a analizar.
 * @returns {any} - Valor convertido (ej. número si aplica).
 */
function parseValue(value: any): any {
  if (typeof value === "string" && /^\d+$/.test(value) && value.length < 10) {
    return Number(value);
  }
  return value;
}
