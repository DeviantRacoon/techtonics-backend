import { Router } from "express";

import userRouter from "./user.routes";
import roleRouter from "./role.routes";
import businessUnitRouter from "./business-unit.routes";
import productRouter from "./product.routes";

const administrationRouter = Router();

administrationRouter.use("/users", userRouter);
administrationRouter.use("/roles", roleRouter);
administrationRouter.use("/business-units", businessUnitRouter);
administrationRouter.use("/products", productRouter);

export default administrationRouter;