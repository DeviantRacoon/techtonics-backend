import { Router } from 'express';

import { validate } from '@middlewares/validator.middleware';
import { closeSessionSchema } from '@modules/user/validator/session.validator';

import { getSessions, closeSession, banSession } from '@modules/user/services/session.service';

const sessionRouter = Router();

sessionRouter.get('/', getSessions);
sessionRouter.put('/close-session', validate(closeSessionSchema), closeSession);
sessionRouter.put('/ban-session', validate(closeSessionSchema), banSession);

export default sessionRouter;
