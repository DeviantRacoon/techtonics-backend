import fs from "fs/promises";
import path from "path";
import express from "express";

import logger from "./logger";
import dotenv from "./dotenv";

import CacheManager from "@utils/cache.handler";

dotenv.config();

const EXTENSION = process.env.NODE_ENV === "development" ? "ts" : "js";
const DIR = process.env.NODE_ENV === "development" ? "src" : "dist";

const routeCache = new CacheManager<any>({
  ttl: 60000, 
  maxSize: 100, 
  scope: "local", 
});

async function getFilesInDirectory(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const fileList: string[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const nestedFiles = await getFilesInDirectory(filePath);
      fileList.push(...nestedFiles); 
    } else if (file.name.endsWith(EXTENSION)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

export default async function routeManager(app: express.Application): Promise<void> {
  const routesDir = path.join(process.cwd(), DIR, "app", "routes");
  const routeFiles = await getFilesInDirectory(routesDir); 

  for (const routePath of routeFiles) {
    const relativePath = path.relative(routesDir, routePath);
    const fileParts = relativePath.split(path.sep);
    const routePrefix = fileParts.slice(0, -1).join("/");
    const fileNamePrefix = path.basename(routePath, `.${EXTENSION}`).split(".")[0];

    let fullRoutePrefix =
      fileNamePrefix === "index"
        ? routePrefix || "/"
        : routePrefix
        ? `${routePrefix}/${fileNamePrefix}`
        : fileNamePrefix;

    fullRoutePrefix = `/api/${fullRoutePrefix}`.replace(/\/+/g, "/");

    try {
      let routeModule: any;

      if (routeCache.has(routePath)) {
        routeModule = routeCache.get(routePath);
      } else {
        routeModule = await import(routePath);
        routeCache.set(routePath, routeModule);
      }

      if (routeModule.default) {
        app.use(fullRoutePrefix, routeModule.default);
      } else {
        logger.warn(`El archivo ${routePath} no tiene una exportación predeterminada de ruta.`);
      }
    } catch (err) {
      logger.error(`Error al importar el archivo de ruta ${routePath}: ${err}`);
    }
  }
}
