import 'reflect-metadata';

import AppDataSource from '@config/typeorm';
import { ServerExpress } from '@config/server';

import logger from '@libs/logger';

async function initializeServer() {
  try {

    await AppDataSource.initialize();
    logger.info('✅ Conexión a la base de datos exitosa');

    const app = new ServerExpress();

    app.startServer(() => {
      logger.info(`🚀 Servidor iniciado en http://localhost:${app.port}`);
    });

  } catch (error) {
    logger.error(`❌ Error al iniciar el servidor o la base de datos: ${error}`);
    process.exit(1);
  }
}

initializeServer();
