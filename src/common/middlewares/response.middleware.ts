import { Request, Response, NextFunction } from 'express';

export default function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (body: any): Response {
    if (res.statusCode >= 400) {
      body = {
        ok: false,
        message: body.message || "Lo sentimos, ha ocurrido un error, nuestro equipo lo esta trabajando. Por favor, intente mas tarde.",
        error: body.error,
      };
    } else if (body && body.message) {
      body = {
        ok: true,
        ...body,
      };
    }
    return originalJson.call(this, body);
  };

  next();
}
