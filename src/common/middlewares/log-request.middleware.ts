import { Request, Response, NextFunction } from 'express';
import logger from '@libs/logger';

export default function logRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    if (res.statusCode === 500) {
      logger.error(`Request ${req.method} to ${req.originalUrl} responded with status ${res.statusCode}`);
    } else {
      logger.debug(`Request ${req.method} to ${req.originalUrl} responded with status ${res.statusCode}`);
    }
  });
  next();
}

