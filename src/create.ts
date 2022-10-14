import type { CommandOptions } from './types';
import inquiry from './interactive/inquiry';
import template from './interactive/template';
import { fileInfo } from './utils/file';
import chalk from 'chalk';

export async function create(name: string, option: CommandOptions) {
  if (name && fileInfo(name).isExists && !option.force) {
    console.log(chalk.red(`Directory ${name}  （${name}目录存在）`));
    return;
  }

  const inquiryData = await inquiry(name, option);
  template(inquiryData);
}
