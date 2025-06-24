import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import UserService from '@modules/users/services/user.service';
import { createUserSchema, updateUserSchema, updateBusinessUnitsToUserSchema } from '@modules/users/domain/validator/user.validator';

const userRouter = Router();

userRouter.get('/', UserService.getUser as any);
userRouter.get('/unique', UserService.getOneUser as any);
userRouter.post('/', validate(createUserSchema), UserService.userRegister as any);
userRouter.put('/', validate(updateUserSchema), UserService.userUpdate as any);
userRouter.put('/business-units', validate(updateBusinessUnitsToUserSchema), UserService.updateBusinessUnitsToUser as any);

export default userRouter;
