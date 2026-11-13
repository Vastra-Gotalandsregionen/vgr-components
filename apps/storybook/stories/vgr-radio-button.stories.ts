import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface VgrRadioButtonArgs {
  disabled: boolean;
  checked: boolean;
  name?: string;
  value?: string;
  label: string;
}

const meta: Meta<VgrRadioButtonArgs> = {
  title: 'Components/VgrRadioButton',
  component: 'vgr-radio-button',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    checked: { control: { type: 'boolean' } },
    name: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    disabled: false,
    checked: false,
    name: 'choice',
    value: 'Grön',
    label: 'Klicka här',
  },
  render: (args) => html`
    <vgr-radio-button
      ?disabled=${args.disabled}
      ?checked=${args.checked}
      name=${args.name}
      value=${args.value}
      label=${args.label}
    >
    </vgr-radio-button>
  `,
};

export default meta;
type Story = StoryObj<VgrRadioButtonArgs>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
