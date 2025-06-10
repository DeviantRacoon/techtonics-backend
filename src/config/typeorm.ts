import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'mi_app',
  entities: ['src/**/infrastructure/entities/*.entity.ts'],
  migrations: ['src/common/database/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'development', 
  // logging: process.env.NODE_ENV === 'development',
});

export default AppDataSource;