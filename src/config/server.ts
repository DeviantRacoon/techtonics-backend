import express from "express";
import dotenv from "dotenv";
import corsConfig from "./cors";
import routes from "./routes";

import responseMiddleware from "@middlewares/response.middleware";
import notFoundMiddleware from "@middlewares/404.middleware";
import authMiddleware from "@middlewares/jwt.middleware";

dotenv.config();

export class ServerExpress {
  private app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    routes(this.app);
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(corsConfig);
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(responseMiddleware);
    this.app.use(authMiddleware);
    this.app.use(notFoundMiddleware);
  }

  startServer(callback: VoidFunction) {
    this.app.listen(this.port, callback);
  }
}
