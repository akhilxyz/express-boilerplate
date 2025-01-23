import express, { Express } from 'express';
import { errorMiddleware, handleInvalidRoute, requestLoggerMiddleware } from '@/shared/middlewares';
import helmet from 'helmet';
import cors from 'cors';
import moduleLoader from '@/core/loaders/module.loader';
import { BootstrapsSwagger } from './swagger.bootstrap';
import expressSession from 'express-session';
import { ServerConfig } from '@/config';
import path from 'path';

// Basic Auth Middleware

export function bootstrapExpress(): Express {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(expressSession(ServerConfig.create().expressSession));
  // Set EJS as the view engine
  app.set('view engine', 'ejs');

  // Set the views directory (EJS templates)
  app.set('views', path.join(__dirname, '../shared/views'));

  // Other middleware and routes... 
  app.use(requestLoggerMiddleware.logRequest);

  // Initialize routes
  moduleLoader(app);

  // swagger loader
  BootstrapsSwagger(app)


  // Error handling
  app.use(handleInvalidRoute);
  app.use(errorMiddleware);

  return app;
}
