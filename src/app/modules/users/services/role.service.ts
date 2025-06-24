import { Request, Response, NextFunction } from "express";
import { requestHandler } from "@core/bases/base.services";
import { Cacheable } from "@libs/cacheable";

import Role from "../domain/models/role";
import roleRepository from "../infrastructure/repositories/role.repository";

export default class RoleService {
  @requestHandler
  @Cacheable({ keyPrefix: "roles", ttl: 60 })
  static async getRoles(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await roleRepository.getRolesByParams(req.query);
    return { data, total };
  }

  @requestHandler
  @Cacheable({ keyPrefix: "role", idParam: "roleId", ttl: 60 })
  static async getOneRole(this: void, req: Request, res: Response, next: NextFunction) {
    const role = await roleRepository.getOneRoleByParams(req.query);
    return role;
  }

  @requestHandler
  static async roleRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.createRoleOrUpdate(role);
    return result;
  }

  @requestHandler
  @Cacheable({ keyPrefix: "permissions", ttl: 60 })
  static async getPermissions(this: void, _req: Request, res: Response, next: NextFunction) {
    const result = await roleRepository.getPermissions();
    return result;
  }

  @requestHandler
  static async addPermissionToRole(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.addPermissionToRole(role);
    return result;
  }

  @requestHandler
  static async roleUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.createRoleOrUpdate(role);
    return result;
  }
}
