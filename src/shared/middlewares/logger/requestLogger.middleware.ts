import { Request, Response, NextFunction } from 'express';
import { logger } from '@/shared/utils';

class RequestLoggerMiddleware {
  logRequest = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      logger.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
  };
}

export const requestLoggerMiddleware = new RequestLoggerMiddleware() 