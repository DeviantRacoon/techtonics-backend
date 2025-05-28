import prisma from "@libs/prisma";

import Role from "../../domain/models/role";

import criterialHandler from "@utils/criterial.handler";
import paginateHandler from "@utils/paginate.handler";

class RoleRepository {
  async getRolesByParams(params: any) {
    const { role_catalog } = prisma;

    const allowedKeys = ['roleId', 'roleName', 'status'];
    const relationKeys = ['user'];

    const { where, include } = criterialHandler({ params, allowedKeys, relationKeys });
    const paginate = { page: params.page || 1, limit: params.limit || 10 };

    const { data, total } = await paginateHandler(role_catalog, where, include, paginate);
    return { data, total };
  };

  async getOneRoleByParams(params: any) {
    const { role_catalog } = prisma;

    const allowedKeys = ['roleId', 'roleName', 'status'];
    const relationKeys = ['user'];

    const query = criterialHandler({params, allowedKeys, relationKeys});

    const role = await role_catalog.findFirst(query);
    return role;
  };

  async createRoleOrUpdate(role: Role) {
    let result;

    if (role.roleId) {
      result = await prisma.role_catalog.update({
        where: { roleId: role.roleId },
        data: role.toJSON()
      });
    } else {
      result = await prisma.role_catalog.create({
        data: role.toJSON() as any
      });
    }

    return result;
  };
}

const roleRepository = new RoleRepository();
export default roleRepository;
