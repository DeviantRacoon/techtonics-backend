import { Router } from "express";

import userRouter from "./user.routes";
import roleRouter from "./role.routes";
import sectionRouter from "./section.routes";
import menuRouter from "./menu.routes";
import permissionRouter from "./permission.routes";

const administrationRouter = Router();

administrationRouter.use("/user", userRouter);
administrationRouter.use("/role", roleRouter);
administrationRouter.use("/section", sectionRouter);
administrationRouter.use("/menu", menuRouter);
administrationRouter.use("/permission", permissionRouter);

export default administrationRouter;