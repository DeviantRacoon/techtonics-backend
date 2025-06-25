import fs from 'fs-extra';
import path from 'path';

const DEFAULT_DIR = path.join(process.cwd(), 'public', 'uploads');

export interface FileBuffer {
  originalname: string;
  buffer: Buffer;
}

export async function saveFile(
  file: FileBuffer,
  dir: string = DEFAULT_DIR
): Promise<string> {
  await fs.ensureDir(dir);
  const storedName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(dir, storedName);
  await fs.writeFile(filePath, file.buffer);
  return filePath;
}
