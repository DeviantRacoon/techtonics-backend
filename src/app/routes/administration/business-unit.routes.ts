import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getBusinessUnits, getOneBusinessUnit, businessUnitRegister, businessUnitUpdate } from '@modules/users/services/business-unit.service';
import { createBusinessUnitSchema, updateBusinessUnitSchema } from '@modules/users/domain/validator/business-unit';

const businessUnitRouter = Router();

businessUnitRouter.get('/', getBusinessUnits);
businessUnitRouter.get('/unique', getOneBusinessUnit);
businessUnitRouter.post('/', validate(createBusinessUnitSchema), businessUnitRegister);
businessUnitRouter.put('/', validate(updateBusinessUnitSchema), businessUnitUpdate);

export default businessUnitRouter;

