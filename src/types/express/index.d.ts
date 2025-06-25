import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    files?: { originalname: string; buffer: Buffer }[];
  }
}
