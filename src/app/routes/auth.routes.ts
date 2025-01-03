import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { login } from '@modules/user/services/user.service';
import { loginSchema } from '@modules/user/validator/user.validator';

const router = Router();

router.post('/login', validate(loginSchema), login);

export default router;
