import prisma from "@libs/prisma";

import Permission from "../models/permission";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class PermissionRepository {
  async getByParams(params: any) {
    const { permission_administration } = prisma;

    const allowedKeys = ['sectionId', 'roleId', 'status'];
    const relationKeys = ['section', 'role'];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(permission_administration, where, include, paginate);
    return { data, total };
  };

  async getOneByParams(params: any) {
    const { permission_administration } = prisma;

    const allowedKeys = ['permissionId', 'roleId', 'sectionId'];
    const relationKeys = ['role', 'section'];

    const query = criterialHandler({ params, allowedKeys, relationKeys });

    const permission = await permission_administration.findFirst(query);
    return permission;
  };

  async createOrUpdate(permission: Permission) {
    let result;

    if (permission.permissionId) {
      result = await prisma.permission_administration.update({
        where: { permissionId: permission.permissionId },
        data: permission.toJSON()
      });
    } else {
      result = await prisma.permission_administration.create({
        data: permission.toJSON() as any
      });
    }

    return result;
  };
}

const permissionRepository = new PermissionRepository();
export default permissionRepository;
