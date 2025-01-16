import { ServerConfig } from '@/config';
import { logger } from '@/shared/utils';
import express from 'express';
import fs from 'fs';
import path from 'path';

const moduleLoader = (app: express.Application): void => {
  const modulesPath = path.resolve(__dirname, '../../modules');

  if (!fs.existsSync(modulesPath)) {
    throw new Error(`Modules directory not found at: ${modulesPath}`);
  }

  const moduleDirectories = fs.readdirSync(modulesPath);

  moduleDirectories.forEach((dir) => {
    const moduleFilePath = path.join(modulesPath, dir, `${dir}.module.ts`);
    if (fs.existsSync(moduleFilePath)) {
      try {
        // Dynamically require the module
        const ModuleClass = require(moduleFilePath)?.default;

        if (ModuleClass?.router) {
          const { BASE_URL } = ServerConfig.create();
          app.use(BASE_URL, ModuleClass.router);
          logger.info(`Loaded module: ${dir}`);
        } else {
          logger.warn(`Module ${dir} does not export a router`);
        }
      } catch (error: any) {
        logger.error(`Failed to load module ${dir}:`, error.message);
      }
    } else {
      logger.warn(`Module file not found for directory: ${dir}`);
    }
  });
};

export default moduleLoader;
