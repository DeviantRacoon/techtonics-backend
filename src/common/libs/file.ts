export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

import fs from 'fs-extra';
import path from 'path';

/**
 * Save an uploaded file buffer to the specified folder.
 * The returned path is relative to the project root.
 */
export async function saveFile(file: UploadedFile, folder: string): Promise<string> {
  await fs.ensureDir(folder);
  const filename = `${Date.now()}_${file.originalname}`;
  const filePath = path.join(folder, filename);
  await fs.writeFile(filePath, file.buffer);
  return filePath;
}
