import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

import { getPermissions, getOnePermission, createPermission, updatePermission } from "@modules/menu/services/permission.service";
import { createPermissionSchema, updatePermissionSchema } from "@modules/menu/validator/permission.validator";

const router = Router();

router.get("/", getPermissions);
router.get("/unique", getOnePermission);
router.post("/", validate(createPermissionSchema), createPermission);
router.put("/", validate(updatePermissionSchema), updatePermission);

export default router;