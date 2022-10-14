import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist/',
    },
  ],
  clean: true,
  externals: ['commander', 'chalk', 'fs-extra', 'path', 'inquirer', 'rxjs', 'ora', 'giget'],
  // rollup: {
  //   commonjs: {},
  // },
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },

  // Generates .d.ts declaration file
  // declaration: true,
});
