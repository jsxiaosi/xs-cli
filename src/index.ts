import { Command } from 'commander';
import chalk from 'chalk';
import type { CommandOptions } from './types';
import { create } from './create';
import { getPkgInfo } from './utils/file';

export function main() {
  const pkg = getPkgInfo();
  const program = new Command(`${pkg.name}`);

  program.helpOption('-h, --help', '显示命令的帮助');
  program.version(`${pkg.version}`, '-v, --version', '查看版本号');
  program.on('--help', () => {
    console.log(`\r\n Run ${chalk.green(`${pkg.name} create --help`)} 查看更多 \r\n `);
  });

  program
    .command('create [project-name]')
    .description('创建项目到新的目录中')
    .option('-f, --force', '如果存在，覆盖目录')
    .action((name: string, option: CommandOptions) => {
      create(name, option);
    });

  // program.help({ error: true });

  program.parse(process.argv);
}
