import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '@core/bases/base.services';
import { Cacheable, InvalidateCache } from '@libs/cacheable';

import Product from '../domain/models/product';
import productRepository from '../infrastructure/repositories/product.repository';

export default class ProductService {
  @RequestHandler
  @Cacheable({ keyPrefix: 'products', ttl: 60 })
  static async getProducts(this: void, req: Request, res: Response, next: NextFunction) {
    const { data, total } = await productRepository.getProductsByParams(req.query);
    return { data, total };
  }

  @RequestHandler
  @Cacheable({ keyPrefix: 'products', idParam: 'productId', ttl: 60 })
  static async getOneProduct(this: void, req: Request, res: Response, next: NextFunction) {
    const product = await productRepository.getOneProductByParams(req.query);
    return product;
  }

  @RequestHandler
  @InvalidateCache({ keys: ['products'] })
  static async productRegister(this: void, req: Request, res: Response, next: NextFunction) {
    const [file] = (req as any).files as { originalname: string; buffer: Buffer }[] || [];
    const product = new Product(req.body);

    if (file) {
      const { saveFile } = await import('@libs/file');
      product.productImage = await saveFile(file);
    }

    const result = await productRepository.createProduct(product);
    return result;
  }

  @RequestHandler
  // @InvalidateCache({ keys: (req: Request) => ['products', `product:${req.body.productId}`] })
  @InvalidateCache({ keys: ['products'] })
  static async productUpdate(this: void, req: Request, res: Response, next: NextFunction) {
    const [file] = (req as any).files as { originalname: string; buffer: Buffer }[] || [];
    const product = new Product(req.body);
    if (file) {
      const { saveFile } = await import('@libs/file');
      product.productImage = await saveFile(file);
    }
    const result = await productRepository.createProduct(product);
    return result;
  }
}
