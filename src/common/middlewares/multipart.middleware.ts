import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { UploadedFile } from '@libs/file';

const upload = multer({ storage: multer.memoryStorage() }).any();

export default function multipartMiddleware(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (err: any) => {
    if (err) return next(err);
    if (Array.isArray(req.files)) {
      const files: Record<string, UploadedFile> = {};
      for (const file of req.files as any[]) {
        files[file.fieldname] = {
          buffer: file.buffer,
          originalname: file.originalname,
          mimetype: file.mimetype,
        };
      }
      (req as any).files = files;
    }
    next();
  });
}
