import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getRoles, getOneRole, roleRegister, roleUpdate, addPermissionToRole } from '@modules/users/services/role.service';
import { createRoleSchema, updateRoleSchema, addPermissionToRoleSchema } from '@modules/users/domain/validator/role.validator';

const roleRouter = Router();

roleRouter.get('/', getRoles);
roleRouter.get('/unique', getOneRole);
roleRouter.post('/', validate(createRoleSchema), roleRegister);
roleRouter.put('/', validate(updateRoleSchema), roleUpdate);
roleRouter.patch('/permissions', validate(addPermissionToRoleSchema), addPermissionToRole);

export default roleRouter;
