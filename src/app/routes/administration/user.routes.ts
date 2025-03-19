import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getUser, getOneUser, userRegister, userUpdate } from '@modules/user/services/user.service';
import { createUserSchema, updateUserSchema } from '@modules/user/validator/user.validator';

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/unique', getOneUser);
userRouter.post('/', validate(createUserSchema), userRegister);
userRouter.put('/', validate(updateUserSchema), userUpdate);

export default userRouter;
