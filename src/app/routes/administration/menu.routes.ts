import { Router } from "express";
import { validate } from "@middlewares/validator.middleware";

// import { getMenus, getOneMenu, getMenusAllowed, createMenu, updateMenu } from "@modules/menu/services/menu.service";
// import { createMenuSchema, updateMenuSchema } from "@modules/menu/validator/menu.validator";

const menuRouter = Router();

// menuRouter.get("/", getMenus);
// menuRouter.get("/unique", getOneMenu);
// menuRouter.get("/allowed", getMenusAllowed);
// menuRouter.post("/", validate(createMenuSchema), createMenu);
// menuRouter.put("/", validate(updateMenuSchema), updateMenu);

export default menuRouter;