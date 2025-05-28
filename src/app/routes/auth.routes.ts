import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { login } from '@modules/users/services/user.service';
import { loginSchema } from '@modules/users/domain/validator/user.validator';

const authRoute = Router();

authRoute.post('/login', validate(loginSchema), login);

export default authRoute;
