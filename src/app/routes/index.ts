import { Router } from "express";

import sessionRouter from "./session.routes";
import authRouter from "./auth.routes";
import apiCreatorRouter from "./api-creator.routes";
import fileRouter from "./file.routes";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Ruta de index" });
});

indexRouter.use("/sessions", sessionRouter);
indexRouter.use("/api-creator", apiCreatorRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/files", fileRouter);

export default indexRouter;