import { Request } from "express";
import { requestHandler } from "@utils/request.handler";

import Section from "../models/section";
import sectionRepository from "../repositories/section.repository";

export const getSections = requestHandler(async (req: Request) => {
  const { data, total } = await sectionRepository.getByParams(req.query);
  return { data, total };
});

export const getOneSection = requestHandler(async (req: Request) => {
  const role = await sectionRepository.getOneByParams(req.query);
  return role;
});

export const createSection = requestHandler(async (req: Request) => {
  const menu = new Section(req.body);
  const result = await sectionRepository.createOrUpdate(menu);
  return result;
});

export const updateSection = requestHandler(async (req: Request) => {
  const menu = new Section(req.body);
  const result = await sectionRepository.createOrUpdate(menu);
  return result;
});

