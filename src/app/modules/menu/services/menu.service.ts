import { Request } from "express";
import { requestHandler } from "@utils/request.handler";

import Menu from "../models/menu";
import menuRepository from "../repositories/menu.repository";

export const getMenus = requestHandler(async (req: Request) => {
  const { data, total } = await menuRepository.getByParams(req.query);
  return { data, total };
});

export const getOneMenu = requestHandler(async (req: Request) => {
  const role = await menuRepository.getOneByParams(req.query);
  return role;
});

export const getMenusAllowed = requestHandler(async (req: Request) => {
  const menus = await menuRepository.getMenusByRole(1)
  return menus
})

export const createMenu = requestHandler(async (req: Request) => {
  const menu = new Menu(req.body);
  const result = await menuRepository.createOrUpdate(menu);
  return result;
});

export const updateMenu = requestHandler(async (req: Request) => {
  const menu = new Menu(req.body);
  const result = await menuRepository.createOrUpdate(menu);
  return result;
});

