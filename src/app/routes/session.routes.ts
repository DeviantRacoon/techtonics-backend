import { Router } from 'express';

import { validate } from '@middlewares/validator.middleware';
import { closeSessionSchema } from '@modules/user/validator/session.validator';

import { getSessions, closeSession, banSession } from '@modules/user/services/session.service';

const router = Router();

router.get('/', getSessions);
router.put('/close-session', validate(closeSessionSchema), closeSession);
router.put('/ban-session', validate(closeSessionSchema), banSession);

export default router;
