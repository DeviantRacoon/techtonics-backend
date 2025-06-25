import { Request, Response, NextFunction } from 'express';
import getRawBody from 'raw-body';

// Very small multipart parser supporting basic form data and single file fields
export default async function multipartMiddleware(req: Request, res: Response, next: NextFunction) {
  const type = req.headers['content-type'];
  if (type && type.includes('multipart/form-data')) {
    const match = type.match(/boundary=(?:(?:"([^\"]+)")|([^;]+))/);
    if (!match) {
      return next();
    }
    const boundary = match[1] || match[2];
    const bodyBuffer = await getRawBody(req);
    const parts = bodyBuffer.toString('binary').split(`--${boundary}`);
    req.body = {};
    (req as any).files = {};
    for (const part of parts) {
      if (!part || part === '--\r\n' || part === '--' || part === '\r\n') continue;
      const [head, ...rest] = part.split('\r\n\r\n');
      if (!head || !rest.length) continue;
      const content = rest.join('\r\n\r\n');
      const headers = head.split('\r\n').filter(Boolean);
      const disposition = headers.find(h => h.toLowerCase().startsWith('content-disposition'));
      if (!disposition) continue;
      const nameMatch = disposition.match(/name="([^"]+)"/);
      if (!nameMatch) continue;
      const fieldName = nameMatch[1];
      const filenameMatch = disposition.match(/filename="([^"]*)"/);
      const value = content.replace(/\r\n--$/, '').replace(/\r\n$/, '');
      if (filenameMatch && filenameMatch[1]) {
        const mimeHeader = headers.find(h => h.toLowerCase().startsWith('content-type'));
        const mimetype = mimeHeader ? mimeHeader.split(':')[1].trim() : 'application/octet-stream';
        const buffer = Buffer.from(value, 'binary');
        (req as any).files[fieldName] = { buffer, originalname: filenameMatch[1], mimetype };
      } else {
        req.body[fieldName] = value;
      }
    }
  }
  next();
}
