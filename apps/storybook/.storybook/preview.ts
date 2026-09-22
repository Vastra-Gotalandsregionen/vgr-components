import { defineCustomElements } from '@vgregion/components-core/loader';
import '@vgregion/components-core/dist/styles.css';

defineCustomElements();

const preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
