import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'vgregion-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '../../../node_modules/@vgregion/design-tokens/dist/css/tokens.css',
          dest: 'tokens.css',
        },
      ],
    },
  ],
};
