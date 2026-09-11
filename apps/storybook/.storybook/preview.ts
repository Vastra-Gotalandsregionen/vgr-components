import { defineCustomElements } from '@vgregion/components-core/loader';
import '@vgregion/design-tokens/dist/css/tokens.css';

defineCustomElements();

const preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
