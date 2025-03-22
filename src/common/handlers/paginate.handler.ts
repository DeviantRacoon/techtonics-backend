export default async function paginateHandler(
  model: any,
  where: { [key: string]: any },
  include: { [key: string]: any },
  paginate: { page: number, limit: number } = { page: 1, limit: 15 },
  orderBy: 'asc' | 'desc' | 'none' = 'desc'
) {
  const skip = (paginate.page - 1) * paginate.limit;
  const take = paginate.limit;
  
  orderBy = orderBy === 'none' ? 'desc' : orderBy;

  const [data, total] = await Promise.all([
    model.findMany({ where, skip, include, take, orderBy: { createdAt: orderBy } }),
    model.count()
  ]);

  return { data, total };
}