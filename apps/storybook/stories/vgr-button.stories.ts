import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';

interface VgrButtonArgs {
  variant: 'primary' | 'secondary' | 'danger';
  disabled: boolean;
  text: string;
}

const meta: Meta<VgrButtonArgs> = {
  title: 'Components/VgrButton',
  render: (args) => html`
    <vgr-button
      variant=${args.variant}
      ?disabled=${args.disabled}
      @vgrClick=${() => console.log('vgrClick fired')}
      text=${args.text}
    >
    </vgr-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: { control: { type: 'boolean' } },
    text: { control: { type: 'text' } },
  },
  args: {
    variant: 'primary',
    disabled: false,
    text: 'Klicka här',
  },
};

export default meta;
type Story = StoryObj<VgrButtonArgs>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
