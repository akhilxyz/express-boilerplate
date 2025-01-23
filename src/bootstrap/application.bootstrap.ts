// src/bootstrap/application.bootstrap.ts
import { Express } from 'express';
import { bootstrapDatabase, bootstrapExpress } from '@/bootstrap';
import { logger } from '@/shared/utils';

export async function bootstrapApplication(): Promise<Express> {
  try {

    // Initialize Database
    await bootstrapDatabase();

    // Initialize Express
    const app = bootstrapExpress();

    logger.info('Application bootstrapped successfully');
    return app;
  } catch (error) {
    logger.error('Failed to bootstrap application:', error);
    throw error;
  }
}
