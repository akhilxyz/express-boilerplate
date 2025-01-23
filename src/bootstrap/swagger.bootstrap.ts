import { SwaggerConfig } from '@/config/swagger.config';
import swaggerLoader from '@/core/loaders/swagger.loader';
import { Request, Response } from 'express';
import { Application } from 'express-serve-static-core';
import swaggerUi from 'swagger-ui-express';

// Renamed for clarity: 'swaggerLoginHandler' handles the actual login logic
function swaggerLoginHandler(req: Request, res: Response): void {
  const { username, password } = req.body;

  // Simplified condition with descriptive error message handling
  if (username === SwaggerConfig.create().username && password === SwaggerConfig.create().password) {
    return res.redirect('/api-docs');
  }

  // Render the login page with an error message if credentials are invalid
  return res.render('swaggerAuth', { errorMessage: 'Invalid username or password!' });
}

// Renamed to 'renderSwaggerAuthPage' for clarity
function renderSwaggerAuthPage(req: Request, res: Response): void {
  res.render('swaggerAuth', { errorMessage: '' });
}

// Bootstrap function for Swagger setup, renamed for consistency
export function BootstrapsSwagger(app: Application): void {


  // Get the Swagger documentation config from the config
  const { SwaggerDoc } = SwaggerConfig.create();
  // Load the Swagger documentation with a loader utility
  const doc = swaggerLoader(SwaggerDoc);

  // Set up the Swagger UI for '/api-docs'
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
  // Set up routes for Swagger login and documentation
  app.get('/swagger-login', renderSwaggerAuthPage);
  app.post('/swagger-login', swaggerLoginHandler);
}
