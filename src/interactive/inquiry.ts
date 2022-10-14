import chalk from 'chalk';
import type { Answers, QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';
import { Subject } from 'rxjs';
import { fileInfo } from '../utils/file';
import type { CommandOptions, InquiryData } from '../types';

const INPUT_NAME = {
  name: 'name',
  type: 'input',
  default: 'xs-template',
  message: 'Please enter the project name（请输入项目名称）',
};

const TEMPLATE = {
  FRAME: {
    name: 'frame',
    type: 'list',
    choices: [
      { name: 'vue', value: 'VUE_TEMPLATE' },
      { name: 'react', value: 'REACT_TEMPLATE' },
    ],
    message: 'Select Frame（选择框架）',
  },
  VUE_TEMPLATE: {
    name: 'variant',
    type: 'list',
    choices: [
      { name: 'vue-admin', value: 'VUE_ADMIN' },
      { name: 'nuxt3', value: 'nuxt3-template' },
      { name: 'components-lib', value: 'xs-components-lib' },
      { name: 'uni-app', value: 'vue3-uni_app' },
    ],
    message: 'Select Template Type（选择模版类型）',
  },
  VUE_ADMIN: {
    name: 'project',
    type: 'list',
    choices: [
      { name: 'web', value: 'vue-xs-admin' },
      { name: 'electron', value: 'electron-xs-admin' },
      { name: 'tauri', value: 'tauri-xs-admin' },
    ],
    message: 'Select Project Type（选择项目种类）',
  },
};

type AnswersType = keyof typeof TEMPLATE & string;

export default async function inquiry(name: string, option: CommandOptions) {
  let projectName = name;
  let projectType = '';
  const prompts = new Subject();

  return new Promise<InquiryData>((resolve) => {
    inquirer.prompt(prompts as QuestionCollection<Answers>).ui.process.subscribe((res) => {
      if (res.name === 'name') {
        projectName = res.answer;
        if (fileInfo(projectName).isExists && !option.force) {
          console.log(chalk.red(`Directory ${projectName}  （${projectName}目录存在）`));
          prompts.complete();
          return;
        }
        prompts.next(TEMPLATE.VUE_TEMPLATE);
      } else if (TEMPLATE[res.answer as AnswersType]) {
        prompts.next(TEMPLATE[res.answer as AnswersType]);
      } else {
        projectType = res.answer;
        prompts.complete();
        resolve({ projectName, projectType });
      }
    });
    if (!name) prompts.next(INPUT_NAME);
    else prompts.next(TEMPLATE.VUE_TEMPLATE);
  });
}
