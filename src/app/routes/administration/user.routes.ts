import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getUser, getOneUser, userRegister, userUpdate } from '@modules/users/services/user.service';
import { createUserSchema, updateUserSchema } from '@modules/users/domain/validator/user.validator';

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/unique', getOneUser);
userRouter.post('/', validate(createUserSchema), userRegister);
userRouter.put('/', validate(updateUserSchema), userUpdate);

export default userRouter;
