import { Router } from "express";

import sessionRouter from "./session.routes";
import authRouter from "./auth.routes";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Ruta de index" });
});

indexRouter.use("/sessions", sessionRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;
