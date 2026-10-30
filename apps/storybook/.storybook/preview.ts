import '@vastra-gotalandsregionen/components-core/dist/components/define-all.js';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';

const preview = {
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Guides', ['Getting started', 'Contributing'], '*'],
      },
    },
  },
};

export default preview;
