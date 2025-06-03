import logger from "@libs/logger";
import { Request, Response, NextFunction } from "express";

export function customErrorHandler(
  message: string,
  statusCode: number = 500
): never {
  throw { message, statusCode };
}

export function requestHandler(
  fn: (req: Request, res: Response, next: NextFunction) => any
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      if (data !== undefined) {

        const response: { ok: boolean, data?: any, total?: number, message?: string } = { ok: true };

        response.data = data && data.total !== undefined ? data.data : data;
        response.total = data ? data.total : undefined;
        response.message = data && data.message ? data.message : undefined;

        sanitizeWithNonResponseFields(response.data);
        res.status(200).json(response);
      }
      res.status(204).end();
    } catch (error: any) {
      if (error.message && error.statusCode) {
        res.status(error.statusCode).json({ ok: false, message: error.message });
      } else {
        logger.error(`Error capturado: ${error}`);
        res.status(500).json({ ok: false, message: "Lo sentimos, ha ocurrido un error, nuestro equipo lo esta trabajando. Por favor, intente mas tarde." });
      }
    }
  };
}

const nonResponseFields = ['password'];

const sanitizeWithNonResponseFields = (data: any) => {
  if (Array.isArray(data)) {
    data.forEach((item: any) => { sanitizeWithNonResponseFields(item) });
    return;
  }

  if (typeof data === 'object' && data !== null) {
    nonResponseFields.forEach((field) => { delete data[field] });

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'object') {
        sanitizeWithNonResponseFields(data[key]);
      }
    });
  }
}
