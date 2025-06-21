import { Router } from 'express';

import { validate } from '@middlewares/validator.middleware';
import { closeSessionSchema } from '@modules/users/domain/validator/session.validator';

import { getSessions, closeSession, banSession, closeOneSession } from '@modules/users/services/session.service';

const sessionRouter = Router();

sessionRouter.get('/', getSessions);
sessionRouter.delete('/', closeOneSession);
sessionRouter.put('/close-session', validate(closeSessionSchema), closeSession);
sessionRouter.put('/ban-session', validate(closeSessionSchema), banSession);

export default sessionRouter;
