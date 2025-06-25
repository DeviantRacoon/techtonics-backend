import { Router } from 'express';
import multipartMiddleware from '@middlewares/multipart.middleware';
import FileService from '@modules/files/services/file.service';

const fileRouter = Router();

fileRouter.post('/upload', multipartMiddleware, FileService.upload as any);

export default fileRouter;
