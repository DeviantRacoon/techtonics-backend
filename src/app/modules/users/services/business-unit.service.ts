import { Request, Response, NextFunction } from "express";
import { requestHandler } from "@core/bases/base.services";
import { Cacheable } from "@libs/cacheable";

import BusinessUnit from "../domain/models/business-unit";
import businessUnitRepository from "../infrastructure/repositories/business-unit.repository";

export default class BusinessUnitService {
  @requestHandler
  @Cacheable({ keyPrefix: "businessUnits", ttl: 60 })
  static async getBusinessUnits(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await businessUnitRepository.getBusinessUnitsByParams(req.query);
    return { data, total };
  }

  @requestHandler
  @Cacheable({ keyPrefix: "businessUnit", idParam: "businessUnitId", ttl: 60 })
  static async getOneBusinessUnit(this: void, req: Request, res: Response, next: NextFunction) {
    const businessUnit = await businessUnitRepository.getOneBusinessUnitByParams(req.query);
    return businessUnit;
  }

  @requestHandler
  static async businessUnitRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const businessUnit = new BusinessUnit(req.body);
    const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
    return result;
  }

  @requestHandler
  static async businessUnitUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const businessUnit = new BusinessUnit(req.body);
    const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
    return result;
  }
}
