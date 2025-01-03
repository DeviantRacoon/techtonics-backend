import { ok } from 'assert';
import { Request, Response, NextFunction } from 'express';

export default function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada'
  });
};
