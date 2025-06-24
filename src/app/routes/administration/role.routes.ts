import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import RoleService from '@modules/users/services/role.service';
import { createRoleSchema, updateRoleSchema, addPermissionToRoleSchema } from '@modules/users/domain/validator/role.validator';

const roleRouter = Router();

roleRouter.get('/', RoleService.getRoles as any);
roleRouter.get('/unique', RoleService.getOneRole as any);
roleRouter.post('/', validate(createRoleSchema), RoleService.roleRegister as any);
roleRouter.put('/', validate(updateRoleSchema), RoleService.roleUpdate as any);
roleRouter.get('/permissions', RoleService.getPermissions as any);
roleRouter.patch('/permissions', validate(addPermissionToRoleSchema), RoleService.addPermissionToRole as any);

export default roleRouter;
