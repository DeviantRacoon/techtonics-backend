import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

import { getPermissions, getOnePermission, createPermission, updatePermission } from "@modules/menu/services/permission.service";
import { createPermissionSchema, updatePermissionSchema } from "@modules/menu/validator/permission.validator";

const permissionRouter = Router();

permissionRouter.get("/", getPermissions);
permissionRouter.get("/unique", getOnePermission);
permissionRouter.post("/", validate(createPermissionSchema), createPermission);
permissionRouter.put("/", validate(updatePermissionSchema), updatePermission);

export default permissionRouter;