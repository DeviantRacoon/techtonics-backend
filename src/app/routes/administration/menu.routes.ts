import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

import { getMenus, getOneMenu, getMenusAllowed, createMenu, updateMenu } from "@modules/menu/services/menu.service";
import { createMenuSchema, updateMenuSchema } from "@modules/menu/validator/menu.validator";

const router = Router();

router.get("/", getMenus);
router.get("/unique", getOneMenu);
router.get("/allowed", getMenusAllowed);
router.post("/", validate(createMenuSchema), createMenu);
router.put("/", validate(updateMenuSchema), updateMenu);

export default router;