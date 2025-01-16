// src/bootstrap/database.bootstrap.ts
import { AppDataSource, isDatabaseInitialized } from '@/infrastructure/database/connection';
import { logger } from '@/shared/utils'; // Custom logger utility

export async function bootstrapDatabase(): Promise<void> {
  try {
    const isInitialized = isDatabaseInitialized() 
    // Check if the database connection is already initialized
    if (isInitialized) {
      logger.info('Database connection is already initialized.');
      return;
    }
    // Initialize database connection
    await AppDataSource.initialize();

    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
}