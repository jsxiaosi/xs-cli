import ora from 'ora';
import fs from 'fs-extra';
import { downloadTemplate } from 'giget';
import type { InquiryData } from '../types';
import { fileInfo } from '../utils/file';
import chalk from 'chalk';

export default async function template(inquiryData: InquiryData) {
  const spinner = ora('Template is being created（模版创建中）......');
  spinner.start();

  const { projectName, projectType } = inquiryData;
  const { filePath } = fileInfo(projectName);
  await fs.remove(filePath);
  await downloadTemplate(`github:jsxiaosi/${projectType}`, {
    dir: filePath,
    forceClean: true,
    preferOffline: false,
  });

  const nextSteps = [
    `cd ${projectName}`,
    'Install dependencies with `npm install` or `yarn install` or `pnpm install`',
    '使用`npm install` or `yarn install` or `pnpm install`安装依赖项',
  ];

  console.log(chalk.green(`\n\n🎉 创建成功~！项目是由 <${projectType}> 模版创建的，后续步骤：`));
  console.log(
    chalk.green(
      `\n🎉 Creation succeeded~! The project is created by the <${projectType}> template. Next steps：\n`,
    ),
  );

  for (let i = 0; i < nextSteps.length; i++) {
    console.log(` > ${chalk.green(nextSteps[i])}`);
  }
  spinner.stop();
}
