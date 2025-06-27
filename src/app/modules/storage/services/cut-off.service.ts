import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '@core/bases/base.services';
import { Cacheable, InvalidateCache } from '@libs/cacheable';

import CutOff from '../domain/models/cut-off';
import cutOffRepository from '../infrastructure/repositories/cut-off.repository';

export default class CutOffService {
  @RequestHandler
  @Cacheable({ keyPrefix: 'cut-offs', ttl: 60 })
  static async getCutOffs(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await cutOffRepository.getCutOffsByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: 'cut-offs', idParam: 'cutOffId', ttl: 60 })
  static async getOneCutOff(this: void, req: Request, res: Response, next: NextFunction) {
    const cutOff = await cutOffRepository.getOneCutOffByParams(req.query);
    return cutOff;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['cut-offs'] })
  static async cutOffRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const cutOff = new CutOff(req.body);
    const result = await cutOffRepository.createCutOff(cutOff);
    return result;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['cut-offs'] })
  static async cutOffUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const cutOff = new CutOff(req.body);
    const result = await cutOffRepository.createCutOff(cutOff);
    return result;
  }
}
