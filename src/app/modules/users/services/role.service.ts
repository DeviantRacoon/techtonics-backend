import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "@core/bases/base.services";
import { Cacheable, InvalidateCache } from "@libs/cacheable";

import Role from "../domain/models/role";
import roleRepository from "../infrastructure/repositories/role.repository";

export default class RoleService {
  @RequestHandler
  @Cacheable({ keyPrefix: "roles", ttl: 60 })
  static async getRoles(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await roleRepository.getRolesByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: "role", idParam: "roleId", ttl: 60 })
  static async getOneRole(this: void, req: Request, res: Response, next: NextFunction) {
    const role = await roleRepository.getOneRoleByParams(req.query);
    return role;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['roles'] })
  static async roleRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.createRoleOrUpdate(role);
    return result;
  }

  @RequestHandler
  @Cacheable({ keyPrefix: "permissions", ttl: 60 })
  static async getPermissions(this: void, _req: Request, res: Response, next: NextFunction) {
    const result = await roleRepository.getPermissions();
    return result;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['roles'] })
  static async addPermissionToRole(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.addPermissionToRole(role);
    return result;
  }

  @RequestHandler
  // @InvalidateCache({ keys: (req: Request) => ['roles', `role:${req.body.roleId}`] })
  @InvalidateCache({ keys: ['roles'] })
  static async roleUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const role = new Role(req.body);
    const result = await roleRepository.createRoleOrUpdate(role);
    return result;
  }
}
