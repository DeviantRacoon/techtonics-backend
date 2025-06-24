import { createClient } from 'redis';
import dotenv from 'dotenv';
import logger from '@libs/logger';

dotenv.config();

const host = process.env.REDIS_HOST || 'localhost';
const port = Number(process.env.REDIS_PORT || 6379);
const password = process.env.REDIS_PASSWORD || undefined;

let url = `redis://${host}:${port}`;
if (password) {
  url = `redis://:${password}@${host}:${port}`;
}

const redisClient = createClient({ url });

redisClient.on('error', (err) => logger.error(`Redis error: ${err}`));

redisClient.connect()
  .then(() => logger.info('✅ Conexión a Redis exitosa'))
  .catch((err) => logger.error(`❌ Error al conectar a Redis: ${err}`));

export default redisClient;
