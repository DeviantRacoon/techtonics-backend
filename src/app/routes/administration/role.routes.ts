import { Router } from 'express';
import { validate } from '@middlewares/validator.middleware';

import { getRoles, getOneRole, roleRegister, roleUpdate } from '@modules/user/services/role.service';
import { createRoleSchema, updateRoleSchema } from '@modules/user/validator/role.validator';

const router = Router();

router.get('/', getRoles);
router.get('/unique', getOneRole);
router.post('/', validate(createRoleSchema), roleRegister);
router.put('/', validate(updateRoleSchema), roleUpdate);

export default router;
