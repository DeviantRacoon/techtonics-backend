import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';
import multipartMiddleware from '@middlewares/multipart.middleware';

import ProductMovementService from '@app/modules/storage/services/product-movement.service';
import { createProductMovementSchema, updateProductMovementSchema } from '@app/modules/storage/domain/validator/product-movement.validator';

const productMovementRouter = Router();

productMovementRouter.get('/', ProductMovementService.getProductMovements as any);
productMovementRouter.get('/unique', ProductMovementService.getOneProductMovement as any);
productMovementRouter.post('/', multipartMiddleware, validate(createProductMovementSchema), ProductMovementService.productMovementRegister as any);
productMovementRouter.put('/', multipartMiddleware, validate(updateProductMovementSchema), ProductMovementService.productMovementUpdate as any);

export default productMovementRouter;

