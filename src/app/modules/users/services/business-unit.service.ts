import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "@core/bases/base.services";
import { Cacheable, InvalidateCache } from "@libs/cacheable";

import BusinessUnit from "../domain/models/business-unit";
import businessUnitRepository from "../infrastructure/repositories/business-unit.repository";

import { saveFile } from "@libs/file";

export default class BusinessUnitService {
  @RequestHandler
  @Cacheable({ keyPrefix: "businessUnits", ttl: 60 })
  static async getBusinessUnits(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await businessUnitRepository.getBusinessUnitsByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: "businessUnit", idParam: "businessUnitId", ttl: 60 })
  static async getOneBusinessUnit(this: void, req: Request, res: Response, next: NextFunction) {
    const businessUnit = await businessUnitRepository.getOneBusinessUnitByParams(req.query);
    return businessUnit;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['businessUnits'] })
  static async businessUnitRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const [file] = (req as any).files as { originalname: string; buffer: Buffer }[];

    const businessUnit = new BusinessUnit(req.body);
    businessUnit.businessUnitLogo = await saveFile(file);

    const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
    return result;
  }

  @RequestHandler
  // @InvalidateCache({ keys: (req: Request) => ['businessUnits', `businessUnit:${req.body.businessUnitId}`] })
  @InvalidateCache({ keys: ['businessUnits'] })
  static async businessUnitUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const businessUnit = new BusinessUnit(req.body);
    const result = await businessUnitRepository.createBusinessUnitOrUpdate(businessUnit);
    return result;
  }
}
