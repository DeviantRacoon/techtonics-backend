import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '@core/bases/base.services';
import { Cacheable, InvalidateCache } from '@libs/cacheable';

import ProductMovement from '../domain/models/product-movement';
import productMovementRepository from '../infrastructure/repositories/product-movement.repository';

export default class ProductMovementService {
  @RequestHandler
  @Cacheable({ keyPrefix: 'product-movements', ttl: 60 })
  static async getProductMovements(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await productMovementRepository.getProductMovementsByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: 'product-movements', idParam: 'productMovementId', ttl: 60 })
  static async getOneProductMovement(this: void, req: Request, res: Response, next: NextFunction) {
    const productMovement = await productMovementRepository.getOneProductMovementByParams(req.query);
    return productMovement;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['product-movements'] })
  static async productMovementRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const productMovement = new ProductMovement(req.body);

    const result = await productMovementRepository.createProductMovement(productMovement);
    return result;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['product-movements'] })
  static async productMovementUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const productMovement = new ProductMovement(req.body);
    const result = await productMovementRepository.createProductMovement(productMovement);
    return result;
  }
}

