import { globalPackages as globalManagerPackages } from '@storybook/manager/globals';
import { globalPackages as globalPreviewPackages } from '@storybook/preview/globals';
import { defineConfig } from 'tsup';

// The current browsers supported by Storybook v7
const BROWSER_TARGET = ['chrome100', 'safari15', 'firefox91'];

export default defineConfig(async (options) => {
  const commonConfig = {
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
  };

  const configs = [
    {
      ...commonConfig,
      entry: ['src/manager.js'],
      format: ['esm'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalManagerPackages,
    },
    {
      ...commonConfig,
      entry: ['src/preview.js'],
      format: ['esm', 'cjs'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalPreviewPackages,
    },
  ];

  return configs;
});
