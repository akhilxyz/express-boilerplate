// src/server.ts

// Import necessary modules and configurations
import 'reflect-metadata'; // Enables metadata reflection for decorators
import { bootstrapApplication } from '@/bootstrap'; // Bootstraps the application
import { logger } from '@/shared/utils'; // Custom logger utility
import { ServerConfig } from './config';

/**
 * Starts the server by initializing the application and binding it to the specified port.
 */
const startServer = async (): Promise<void> => {
    try {
        // Initialize the application
        const app = await bootstrapApplication();
        const {HOST_URL , PORT } = ServerConfig.create();
        // Start the server and log its running status
        app.listen(PORT, () => {
            logger.info(`🚀 Server is running at ${HOST_URL}:${PORT}`);
        });
    } catch (error) {
        // Log the error and exit the process with a non-zero code
        logger.error('❌ Failed to start the server:', error);
        process.exit(1);
    }
};

// Run the server startup function
startServer();
