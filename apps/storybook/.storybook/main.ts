import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
};

export default config;
