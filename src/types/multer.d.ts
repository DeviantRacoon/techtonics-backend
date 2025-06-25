declare module 'multer' {
  import { RequestHandler } from 'express';

  interface StorageEngine {}
  interface Multer {
    any(): RequestHandler;
  }

  function multer(options?: { storage?: StorageEngine }): Multer;
  namespace multer {
    function memoryStorage(): StorageEngine;
  }

  export = multer;
}
