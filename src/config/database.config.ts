// src/config/database.config.ts
import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export function getDatabaseConfig(): DataSourceOptions {
  const dbDialect = process.env.DB_DIALECT as "mysql" | "postgres" | "mariadb"; // Type assertion
  return {
    type: dbDialect || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'clean_architecture_db',
    entities: [__dirname + '/../core/domain/entities/**/*.entity.{ts,js}'],
    synchronize: true,
    logging: false,
  };
}