import Role from "../../domain/models/role";
import { RoleEntity } from "../entities/role.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

import Permission from "../../domain/models/permission";

class RoleRepository extends BaseRepository<RoleEntity> {
  constructor() { super(RoleEntity, 'role') };

  async getRolesByParams(params: Record<string, any>): Promise<ResponseInterface<RoleEntity>> {
    const { page, limit, orderBy, ...filters } = params;

    this.joinConfig = {
      permissions: "left"
    };

    return this.findAllByParams({
      filters,
      page,
      limit,
      orderBy,
      forceJoins: ['permissions']
    });
  };

  async getOneRoleByParams(params: Record<string, any>): Promise<RoleEntity | null> {
    return this.findOneByParams(params);
  };

  async createRoleOrUpdate(role: Role): Promise<RoleEntity> {
    return await this.repository.save(role.toJSON());
  };

  async addPermissionToRole(roleId: number, permissions: Permission[]) {
    return await this.repository.update(roleId, {
      permissions: permissions.map(permission => permission.toJSON())
    });
  };

}

const roleRepository = new RoleRepository();
export default roleRepository;
