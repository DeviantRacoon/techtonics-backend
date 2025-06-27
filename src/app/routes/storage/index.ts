import { Router } from "express";

import productRouter from "./product.routes";
import productMovementRouter from "./product-movement.routes";

const storageRouter = Router();

storageRouter.use("/products", productRouter);
storageRouter.use("/product-movements", productMovementRouter);

export default storageRouter;