import indexRouter from "@app/routes";
import administrationRouter from "@app/routes/administration";
import storageRouter from "@app/routes/storage";

const routes = (app: any) => {
  app.use("/api", indexRouter);
  app.use("/api/administration", administrationRouter);
  app.use("/api/storage", storageRouter);
};

export default routes;