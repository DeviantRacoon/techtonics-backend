import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'mi_app',
  entities: ['src/**/infrastructure/orm/*.entity.ts'],
  migrations: ['src/shared/database/migrations/*.ts'],
  synchronize: false, // usar solo en desarrollo si no tienes migraciones
  logging: true,
});
