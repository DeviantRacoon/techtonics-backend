import { Router } from "express";

import sessionRouter from "./session.routes";
import authRouter from "./auth.routes";
import apiCreatorRouter from "./api-creator.routes";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Ruta de index" });
});

indexRouter.use("/session", sessionRouter);
indexRouter.use("/api-creator", apiCreatorRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;