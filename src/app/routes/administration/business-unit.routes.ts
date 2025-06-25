import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';
import multipartMiddleware from '@middlewares/multipart.middleware';

import BusinessUnitService from '@modules/users/services/business-unit.service';
import { createBusinessUnitSchema, updateBusinessUnitSchema } from '@modules/users/domain/validator/business-unit';

const businessUnitRouter = Router();

businessUnitRouter.get('/', BusinessUnitService.getBusinessUnits as any);
businessUnitRouter.get('/unique', BusinessUnitService.getOneBusinessUnit as any);
businessUnitRouter.post(
  '/',
  multipartMiddleware,
  validate(createBusinessUnitSchema),
  BusinessUnitService.businessUnitRegister as any
);
businessUnitRouter.put('/', validate(updateBusinessUnitSchema), BusinessUnitService.businessUnitUpdate as any);

export default businessUnitRouter;

