import { Request } from "express";
import { requestHandler } from "@core/bases/base.services";

import BusinessUnit from "../domain/models/business-unit";
import businessUnitRepository from "../infrastructure/repositories/business-unit.repository";

export const getBusinessUnits = requestHandler(async (req: Request) => {
  const { data, total } = await businessUnitRepository.getBusinessUnitsByParams(req.query);
  return { data, total };
});

export const getOneBusinessUnit = requestHandler(async (req: Request) => {
  const businessUnit = await businessUnitRepository.getOneBusinessUnitByParams(req.query);
  return businessUnit;
});

export const businessUnitRegister = requestHandler(async (req: Request) => {
  const businessUnit = new BusinessUnit(req.body);
  const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
  return result;
});

export const businessUnitUpdate = requestHandler(async (req: Request) => {
  const businessUnit = new BusinessUnit(req.body);
  const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
  return result;
});
