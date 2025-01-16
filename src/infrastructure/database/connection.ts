// bootstrap/database.bootstrap.ts
import { DataSource } from 'typeorm';
import { logger } from '@/shared/utils';
import { getDatabaseConfig } from '@/config';

// AppDataSource
const AppDataSource = new DataSource(getDatabaseConfig());

/**
 * Checks if the database is initialized.
 * @returns {boolean} True if the database is initialized, false otherwise.
 */
function isDatabaseInitialized(): boolean {
    if (AppDataSource.isInitialized) {
        logger.info('Database is already initialized.');
        return true;
    }
    logger.warn('Database is not initialized.');
    return false;
}


export { AppDataSource, isDatabaseInitialized };