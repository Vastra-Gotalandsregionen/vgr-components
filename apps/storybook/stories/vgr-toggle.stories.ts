import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface VgrToggleArgs {
  disabled: boolean;
  srOnlyDisabledReason?: string;
  checked: boolean;
  name: string;
  label: string;
}

const meta: Meta<VgrToggleArgs> = {
  title: 'Components/VgrToggle',
  component: 'vgr-toggle',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    srOnlyDisabledReason: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
    name: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
  args: {
    disabled: false,
    srOnlyDisabledReason: '',
    checked: false,
    name: 'notifications',
    label: 'Slå på notifikationer',
  },
  render: (args) => html`
    <vgr-toggle
      ?disabled=${args.disabled}
      ?checked=${args.checked}
      sr-only-disabled-reason=${ifDefined(args.srOnlyDisabledReason || undefined)}
      name=${args.name}
      label=${args.label}
    >
    </vgr-toggle>
  `,
};

export default meta;
type Story = StoryObj<VgrToggleArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    srOnlyDisabledReason: 'Ditt system stödjer inte notifikationer',
  },
};

export const DisabledAndChecked: Story = {
  args: { disabled: true, checked: true },
};
