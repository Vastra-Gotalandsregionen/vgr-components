import '@vastra-gotalandsregionen/components-core/dist/components/define-all.js';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';
import './docs.css';

const preview = {
  parameters: {
    controls: { expanded: true },
    docs: {
      toc: {
        headingSelector: 'h1, h2, h3',
      },
    },
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
