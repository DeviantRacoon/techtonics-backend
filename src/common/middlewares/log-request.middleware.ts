import { Request, Response, NextFunction } from 'express';
import logger from '@config/logger';

export default function logRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    logger.debug(`Request ${req.method} to ${req.originalUrl} responded with status ${res.statusCode}`);
  });
  next();
};

