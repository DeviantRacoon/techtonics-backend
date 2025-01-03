import { ServerExpress } from "./config/server";
import { initializeDB } from "@libs/prisma";
import logger from "@config/logger";

async function initializeServer() {
  const app = new ServerExpress();

  
  
  try {
    await initializeDB();
    logger.info("Connection successful to the database");
    
    app.startServer(() => {
      logger.info(`Server is up and running at http://localhost:${app.port}`);
    });
  } catch (error) {
    logger.error("Failed to initialize server:", error instanceof Error ? error.message : error);
    process.exit(1); 
  }
}

initializeServer();
