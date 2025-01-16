import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { ResponseUtil } from '@/shared/utils';

// Middleware to handle invalid routes
export const handleInvalidRoute = (req: Request, _res: Response, next: NextFunction) => {
  next(createError(404, `Invalid route: ${req.originalUrl}`)); // Generate a 404 error for invalid routes
};

// General error-handling middleware
export const errorMiddleware = (
  err: createError.HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status : number = err.status || 500;
  const message = err.message || 'Internal Server Error';
  // Respond with JSON for APIs
  ResponseUtil.error(res, message , status)
};
