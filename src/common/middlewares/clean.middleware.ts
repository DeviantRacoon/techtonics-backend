import { Request, Response, NextFunction } from 'express';

export default function cleanUndefinedQueryMiddleware(req: Request, res: Response, next: NextFunction) {
  for (const key in req.query) {
    if (typeof req.query[key] === 'string' && (req.query[key] === 'undefined' || req.query[key] === 'null' || req.query[key]?.includes('undefined') || req.query[key]?.includes('null'))) {
      delete req.query[key];
    };
  }
  next();
}

