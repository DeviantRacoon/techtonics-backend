export default async function paginateHandler(
  model: any,
  where: { [key: string]: any },
  include: { [key: string]: any },
  paginate: { page: number, limit: number }
) {
  const skip = (paginate.page - 1) * paginate.limit;
  const take = paginate.limit;

  const [data, total] = await Promise.all([
    model.findMany({ where, skip, include, take, orderBy: { createdAt: 'desc' } }),
    model.count()
  ]);

  return { data, total };
}