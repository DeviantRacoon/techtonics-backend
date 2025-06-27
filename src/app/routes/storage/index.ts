import { Router } from "express";

import productRouter from "./product.routes";
import productMovementRouter from "./product-movement.routes";
import cutOffRouter from "./cut-off.routes";

const storageRouter = Router();

storageRouter.use("/products", productRouter);
storageRouter.use("/product-movements", productMovementRouter);
storageRouter.use("/cut-offs", cutOffRouter);

export default storageRouter;
