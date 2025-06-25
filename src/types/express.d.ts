import 'express-serve-static-core';
import { UploadedFile } from '../common/libs/file';

declare module 'express-serve-static-core' {
  interface Request {
    files?: Record<string, UploadedFile>;
  }
}
