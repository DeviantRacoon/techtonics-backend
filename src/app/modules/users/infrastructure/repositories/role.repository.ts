import Role from "../../domain/models/role";

import { RoleEntity } from "../entities/role.entity";
import { PermissionEntity } from "../entities/permission.entity";

import { BaseRepository } from "@app/core/bases/base.repository";
import { ResponseInterface } from "@app/core/interfaces";

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

  async getOneRoleByParams(filters: Record<string, any>): Promise<RoleEntity | null> {
    return this.findOneByParams({ filters });
  };

  async createRoleOrUpdate(role: Role): Promise<RoleEntity> {
    return await this.repository.save(role.toJSON());
  };

  async addPermissionToRole(role: Role) {
    const { roleId, permissions } = role.toJSON();

    return await this.repository.save({
      roleId,
      permissions
    });
  };

  async getPermissions() {
    return await this.runRawQuery<PermissionEntity>(`
      SELECT * FROM permissions
    `);
  };

  async existAllPermission(permissionIds: number[]): Promise<boolean> {
    const permissions = await this.runRawQuery<PermissionEntity>(`
      SELECT * FROM permissions WHERE permissionId IN (${permissionIds.join(',')})
    `);
    return permissions.length === permissionIds.length;
  };
}

const roleRepository = new RoleRepository();
export default roleRepository;
