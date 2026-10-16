import { Config } from '@stencil/core';

// Bara för utveckling: bygger dev-sidan (www/) och rör aldrig dist/ (som annars töms på nödvändiga filer).
export const config: Config = {
  namespace: 'vgregion-components',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '../../../node_modules/@vastra-gotalandsregionen/design-tokens/dist/css',
          dest: 'tokens',
        },
        {
          src: '../.tailwind-build/styles.css',
          dest: 'styles.css',
        },
      ],
    },
  ],
};
