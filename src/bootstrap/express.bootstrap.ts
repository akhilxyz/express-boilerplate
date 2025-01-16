// src/bootstrap/express.bootstrap.ts
import moduleLoader from '@/core/loaders/module.loader';
import { errorMiddleware, handleInvalidRoute, requestLoggerMiddleware } from '@/shared/middlewares';
import express, { Express } from 'express';

export function bootstrapExpress(): Express {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes will be registered here
  app.use(requestLoggerMiddleware.logRequest);

  // Initialize routes 
  moduleLoader(app);

  // Error handling
  app.use(handleInvalidRoute);
  app.use(errorMiddleware);


  return app;
}
