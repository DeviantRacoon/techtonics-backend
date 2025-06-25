import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';
import multipartMiddleware from '@middlewares/multipart.middleware';

import ProductService from '@modules/storage/services/product.service';
import { createProductSchema, updateProductSchema } from '@modules/storage/domain/validator/product.validator';

const productRouter = Router();

productRouter.get('/', ProductService.getProducts as any);
productRouter.get('/unique', ProductService.getOneProduct as any);
productRouter.post('/', multipartMiddleware, validate(createProductSchema), ProductService.productRegister as any);
productRouter.put('/', multipartMiddleware, validate(updateProductSchema), ProductService.productUpdate as any);

export default productRouter;
