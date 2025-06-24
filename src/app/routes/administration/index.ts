import { Router } from "express";

import userRouter from "./user.routes";
import roleRouter from "./role.routes";
import sectionRouter from "./section.routes";
import menuRouter from "./menu.routes";
import businessUnitRouter from "./business-unit.routes";

const administrationRouter = Router();

administrationRouter.use("/users", userRouter);
administrationRouter.use("/roles", roleRouter);
administrationRouter.use("/sections", sectionRouter);
administrationRouter.use("/menus", menuRouter);
administrationRouter.use("/business-units", businessUnitRouter);

export default administrationRouter;