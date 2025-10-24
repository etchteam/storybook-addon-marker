import { defineConfig } from 'tsup';

export default defineConfig(async () => {
  const commonConfig = {
    splitting: true,
    format: ['esm'],
    treeshake: true,
    // keep this line commented until https://github.com/egoist/tsup/issues/1270 is resolved
    // clean: options.watch ? false : true,
    clean: false,
    // The following packages are provided by Storybook and should always be externalized
    // Meaning they shouldn't be bundled with the addon, and they shouldn't be regular dependencies either
    external: ['react', 'react-dom', '@storybook/icons'],
  };

  const configs = [
    {
      ...commonConfig,
      entry: ['src/manager.js'],
      platform: 'browser',
      target: 'esnext', // we can use esnext for manager entries since Storybook will bundle the addon's manager entries again anyway
    },
    {
      ...commonConfig,
      entry: ['src/preview.js'],
      platform: 'browser',
      target: 'esnext', // we can use esnext for preview entries since Storybook will bundle the addon's preview entries again anyway
    },
  ];

  return configs;
});
