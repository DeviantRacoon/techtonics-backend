import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getUser, getOneUser, userRegister, userUpdate, updateBusinessUnitsToUser } from '@modules/users/services/user.service';
import { createUserSchema, updateUserSchema, updateBusinessUnitsToUserSchema } from '@modules/users/domain/validator/user.validator';

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/unique', getOneUser);
userRouter.post('/', validate(createUserSchema), userRegister);
userRouter.put('/', validate(updateUserSchema), userUpdate);
userRouter.put('/business-units', validate(updateBusinessUnitsToUserSchema), updateBusinessUnitsToUser);

export default userRouter;
