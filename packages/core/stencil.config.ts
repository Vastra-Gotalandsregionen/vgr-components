import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

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
          src: '../../../node_modules/@vgregion/design-tokens/dist/css',
          dest: 'tokens',
        },
      ],
    },
    reactOutputTarget({
      outDir: '../react/src/components/stencil-generated/',
    }),
    angularOutputTarget({
      componentCorePackage: '@vgregion/components-core',
      outputType: 'standalone',
      directivesProxyFile: '../angular/src/components.ts',
    }),
    { type: 'dist-custom-elements' },
  ],
};
