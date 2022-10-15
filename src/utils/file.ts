import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'path';

/**
 *
 * @param name 文件名称
 * @returns {filePath: 目录路径, existsSync: 目录/文件 是否存在}
 */
export function fileInfo(name: string) {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, name);
  return { filePath: targetPath, isExists: fs.existsSync(targetPath) };
}

/**
 *
 * @param pathName 路径
 * @returns package.json 详情
 */
export function getPkgInfo(pathName?: string) {
  const pkg = JSON.parse(
    fs.readFileSync(
      path.join(pathName || path.resolve(fileURLToPath(import.meta.url), '../../'), `package.json`),
      'utf-8',
    ),
  );

  return pkg;
}
