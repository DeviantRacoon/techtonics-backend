import express from "express";
import dotenv from "dotenv";
import corsConfig from "./cors";
import routes from "./routes";

import responseMiddleware from "@middlewares/response.middleware";
import notFoundMiddleware from "@middlewares/404.middleware";
import authMiddleware from "@middlewares/jwt.middleware";
import loggerMiddleware from "@middlewares/logger.middleware";
import cleanUndefinedQueryMiddleware from "@middlewares/clean.middleware";

dotenv.config();

export class ServerExpress {
  private app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.initializeMiddlewares();
  }
  
  private initializeMiddlewares() {
    this.app.use(corsConfig);
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(loggerMiddleware);
    this.app.use(cleanUndefinedQueryMiddleware);
    this.app.use(responseMiddleware);
    this.app.use(authMiddleware);
    routes(this.app);
    this.app.use(notFoundMiddleware);
  }

  startServer(callback: VoidFunction) {
    this.app.listen(this.port, callback);
  }
}
