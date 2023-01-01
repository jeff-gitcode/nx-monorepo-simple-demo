import type { Options, StorybookConfig } from '@storybook/core-common';
import path from 'path';
import { rootMain } from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
    // '../components/**/*.stories.mdx',
    // '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...(rootMain.addons || []),
    '@nrwl/react/plugins/storybook',
    // '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    // 'storybook-addon-next-router',
    // 'storybook-addon-swc',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }: Options) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType } as Options);
      // config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   '@': path.resolve(__dirname, '../'),
      // };
    }

    // add your own webpack tweaks if needed

    return config;
  },
};

module.exports = config;
