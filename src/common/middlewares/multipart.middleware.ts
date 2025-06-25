import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const multipartMiddleware: RequestHandler = (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return next();
  }

  const match = contentType.match(/boundary=(.+)$/);
  if (!match) {
    res.status(400).send('Invalid multipart/form-data.');
    return;
  }

  const boundary = match[1];
  const chunks: Buffer[] = [];

  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const raw = Buffer.concat(chunks).toString('binary');
    const parts = raw.split(`--${boundary}`);
    (req as any).files = [];
    req.body = req.body || {};

    for (const part of parts) {
      if (!part || part === '--\r\n' || part === '--' || part === '\r\n') continue;
      const index = part.indexOf('\r\n\r\n');
      if (index === -1) continue;
      const rawHeaders = part.slice(0, index);
      let data = part.slice(index + 4);
      if (data.endsWith('\r\n')) {
        data = data.slice(0, -2);
      }
      const dispositionMatch = rawHeaders.match(/name="([^"]+)"/);
      if (!dispositionMatch) continue;
      const name = dispositionMatch[1];
      const filenameMatch = rawHeaders.match(/filename="([^"]*)"/);
      if (filenameMatch && filenameMatch[1]) {
        const filename = path.basename(filenameMatch[1]);
        const fileBuffer = Buffer.from(data, 'binary');
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        const storedName = `${Date.now()}-${filename}`;
        const filePath = path.join(UPLOAD_DIR, storedName);
        fs.writeFileSync(filePath, fileBuffer);
        (req as any).files.push({ originalname: filename, path: filePath });
        (req.body as any)[name] = storedName;
      } else {
        (req.body as any)[name] = data;
      }
    }
    next();
  });
};

export default multipartMiddleware;
