import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface VgrRadioButtonArgs {
  disabled: boolean;
  srOnlyDisabledReason?: string;
  checked: boolean;
  name: string;
  value?: string;
  label: string;
}

const meta: Meta<VgrRadioButtonArgs> = {
  title: 'Components/VgrRadioButton',
  component: 'vgr-radio-button',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    srOnlyDisabledReason: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
    name: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    disabled: false,
    srOnlyDisabledReason: '',
    checked: false,
    name: 'choice',
    value: 'Grön',
    label: 'Klicka här',
  },
  render: (args) => html`
    <vgr-radio-button
      ?disabled=${args.disabled}
      ?checked=${args.checked}
      sr-only-disabled-reason=${ifDefined(args.srOnlyDisabledReason || undefined)}
      name=${args.name}
      value=${ifDefined(args.value || undefined)}
      label=${args.label}
    >
    </vgr-radio-button>
  `,
};

export default meta;
type Story = StoryObj<VgrRadioButtonArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true, srOnlyDisabledReason: 'Alternativet är slut' },
};

export const DisabledAndChecked: Story = {
  args: { disabled: true, checked: true },
};
