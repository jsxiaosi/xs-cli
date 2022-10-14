import fs from 'fs-extra';
import path from 'path';

export function fileInfo(name: string) {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, name);
  return { filePath: targetPath, isExists: fs.existsSync(targetPath) };
}
