import { Request } from "express";
import { requestHandler } from "@utils/request.handler";

import Permission from "../models/permission";
import permissionRepository from "../repositories/permission.repository";

export const getPermissions = requestHandler(async (req: Request) => {
  const { data, total } = await permissionRepository.getByParams(req.query);
  return { data, total };
});

export const getOnePermission = requestHandler(async (req: Request) => {
  const role = await permissionRepository.getOneByParams(req.query);
  return role;
});

export const createPermission = requestHandler(async (req: Request) => {
  const permission = new Permission(req.body);
  const result = await permissionRepository.createOrUpdate(permission);
  return result;
});

export const updatePermission = requestHandler(async (req: Request) => {
  const permission = new Permission(req.body);
  const result = await permissionRepository.createOrUpdate(permission);
  return result;
});

