import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
// TODO: Put in a more general file
import '@vgregion/design-tokens/dist/css/tokens.css';

interface VgrButtonArgs {
  variant: 'primary' | 'secondary' | 'danger';
  disabled: boolean;
  label: string;
}

const meta: Meta<VgrButtonArgs> = {
  title: 'Components/VgrButton',
  render: (args) => html`
    <vgr-button
      variant=${args.variant}
      ?disabled=${args.disabled}
      @vgrClick=${() => console.log('vgrClick fired')}
    >
      ${args.label}
    </vgr-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  args: {
    variant: 'primary',
    disabled: false,
    label: 'Klicka här',
  },
};

export default meta;
type Story = StoryObj<VgrButtonArgs>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
