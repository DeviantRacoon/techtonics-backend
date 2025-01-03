import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getUser, getOneUser, userRegister, userUpdate } from '@modules/user/services/user.service';
import { createUserSchema, updateUserSchema } from '@modules/user/validator/user.validator';

const router = Router();

router.get('/', getUser);
router.get('/unique', getOneUser);
router.post('/', validate(createUserSchema), userRegister);
router.put('/', validate(updateUserSchema), userUpdate);

export default router;
