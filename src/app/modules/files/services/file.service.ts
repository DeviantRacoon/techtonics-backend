import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from '@core/bases/base.services';
import { FileBuffer, saveFile } from '@libs/file';

interface UploadedFileInfo extends FileBuffer {}
export default class FileService {
  @RequestHandler
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

    const saved = [] as { originalname: string; path: string }[];
    for (const file of files) {
      const filePath = await saveFile(file);
      saved.push({ originalname: file.originalname, path: filePath });
    }

    return { files: saved };
  }
}
