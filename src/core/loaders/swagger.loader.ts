import { logger } from '@/shared/utils';
import fs from 'fs';
import path from 'path';


const swaggerLoader = (SwaggerDoc: any): any => {
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

        if (ModuleClass?.swagger) {
          // Merge the swagger paths into SwaggerDoc.paths
          SwaggerDoc.paths = {
            ...SwaggerDoc.paths,
            ...ModuleClass.swagger,
          };
        } else {
          logger.warn(`Module ${dir} does not export a swagger object`);
        }
      } catch (error: any) {
        logger.error(`Failed to load module ${dir}:`, error.message);
      }
    } else {
      logger.warn(`Module file not found for directory: ${dir}`);
    }
  });
  
  // Return the updated SwaggerDoc object
  return SwaggerDoc;
};

export default swaggerLoader;