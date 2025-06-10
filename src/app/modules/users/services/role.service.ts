import { Request } from "express";
import { requestHandler } from "@core/bases/base.services";

import Role from "../domain/models/role";
import roleRepository from "../infrastructure/repositories/role.repository";


export const getRoles = requestHandler(async (req: Request) => {
  const { data, total } = await roleRepository.getRolesByParams(req.query);
  return { data, total };
});

export const getOneRole = requestHandler(async (req: Request) => {
  const role = await roleRepository.getOneRoleByParams(req.query);
  return role;
});

export const roleRegister = requestHandler(async (req: Request) => {
  const role = new Role(req.body);
  const result = await roleRepository.createRoleOrUpdate(role);
  return result;
});

export const addPermissionToRole = requestHandler(async (req: Request) => {
  const role = new Role(req.body);
  const result = await roleRepository.addPermissionToRole(role);
  return result;
});

export const roleUpdate = requestHandler(async (req: Request) => {
  const role = new Role(req.body);

  const result = await roleRepository.createRoleOrUpdate(role);
  return result;
});
