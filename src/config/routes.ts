import indexRouter from "@app/routes";
import administrationRouter from "@app/routes/administration";

const routes = (app: any) => {
  app.use("/api", indexRouter);
  app.use("/api/administration", administrationRouter);
};

export default routes;