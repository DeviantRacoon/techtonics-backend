import { Router } from 'express';

import { validate } from '@middlewares/validator.middleware';
import { closeSessionSchema } from '@modules/users/domain/validator/session.validator';

import SessionService from '@modules/users/services/session.service';

const sessionRouter = Router();

sessionRouter.get('/', SessionService.getSessions as any);
sessionRouter.delete('/', SessionService.closeOneSession as any);
sessionRouter.put('/close-session', validate(closeSessionSchema), SessionService.closeSession as any);
sessionRouter.put('/ban-session', validate(closeSessionSchema), SessionService.banSession as any);

export default sessionRouter;
