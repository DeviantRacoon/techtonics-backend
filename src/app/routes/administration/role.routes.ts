import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getRoles, getOneRole, roleRegister, roleUpdate } from '@modules/users/services/role.service';
import { createRoleSchema, updateRoleSchema } from '@modules/users/domain/validator/role.validator';

const roleRouter = Router();

roleRouter.get('/', getRoles);
roleRouter.get('/unique', getOneRole);
roleRouter.post('/', validate(createRoleSchema), roleRegister);
roleRouter.put('/', validate(updateRoleSchema), roleUpdate);

export default roleRouter;
