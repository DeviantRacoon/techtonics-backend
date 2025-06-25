import { Request, Response, NextFunction } from 'express';
import { requestHandler } from '@core/bases/base.services';

interface UploadedFileInfo {
  originalname: string;
  path: string;
}

export default class FileService {
  @requestHandler
  static async upload(
    this: void,
    req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    const files = (req as any).files as UploadedFileInfo[] | undefined;
    if (!files || files.length === 0) {
      throw { message: 'Archivo no proporcionado', statusCode: 400 };
    }
    return { files };
  }
}
