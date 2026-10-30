import '@vastra-gotalandsregionen/components-core/dist/components/define-all.js';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';

const preview = {
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          'Använda biblioteket',
          ['Installera', 'React', 'Angular', 'Vue', 'Utan ramverk'],
          'Bidra till biblioteket',
          [
            'Design tokens',
            'Arbeta med komponenterna',
            'Storybook och publicering',
          ],
          '*',
        ],
      },
    },
  },
};

export default preview;
