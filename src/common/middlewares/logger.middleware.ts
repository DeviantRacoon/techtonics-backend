import logger from '@libs/logger';
import { Request, Response, NextFunction } from 'express';

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, path } = req;

  const originalSend = res.send;

  res.send = function (body): Response {
    res.send = originalSend;
    const duration = Date.now() - start;
    logger.request(`${method} ${path} ${res.statusCode} - ${duration}ms`);

    return res.send(body);
  };

  next();
};
