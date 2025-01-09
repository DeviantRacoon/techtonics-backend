import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

const router = Router();

const TEMPLATES_DIR = path.resolve(__dirname, '../templates');
const MODULES_DIR = path.resolve(__dirname, '../src/app/modules');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Ruta de index' });
});

export default router;
