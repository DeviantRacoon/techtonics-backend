import { Router } from "express";

import productRouter from "./product.routes";

const storageRouter = Router();

storageRouter.use("/products", productRouter);

export default storageRouter;