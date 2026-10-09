import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { arrowRight, check, plus } from '../src/placeholder-icons';

const icons = { none: undefined, arrowRight, check, plus };

interface VgrButtonArgs {
  variant: 'primary' | 'secondary';
  disabled: boolean;
  text: string;
  icon: keyof typeof icons;
}

const meta: Meta<VgrButtonArgs> = {
  title: 'Components/VgrButton',
  render: (args) => html`
    <vgr-button
      variant=${args.variant}
      ?disabled=${args.disabled}
      @vgrClick=${() => console.log('vgrClick fired')}
      text=${args.text}
      .icon=${icons[args.icon]}
    >
    </vgr-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: { type: 'boolean' } },
    text: { control: { type: 'text' } },
    icon: {
      control: { type: 'select' },
      options: ['none', 'arrowRight', 'check', 'plus'],
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
    text: 'Klicka här',
    icon: 'none',
  },
};

export default meta;
type Story = StoryObj<VgrButtonArgs>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = { args: { icon: 'arrowRight' } };