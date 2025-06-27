import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import CutOffService from '@modules/storage/services/cut-off.service';
import { createCutOffSchema, updateCutOffSchema } from '@modules/storage/domain/validator/cut-off.validator';

const cutOffRouter = Router();

cutOffRouter.get('/', CutOffService.getCutOffs as any);
cutOffRouter.get('/unique', CutOffService.getOneCutOff as any);
cutOffRouter.post('/', validate(createCutOffSchema), CutOffService.cutOffRegister as any);
cutOffRouter.put('/', validate(updateCutOffSchema), CutOffService.cutOffUpdate as any);

export default cutOffRouter;
