import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

type CheckboxArgs = {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  srOnlyDisabledReason: string;
  collapsibleChildren: boolean;
};

const meta: Meta<CheckboxArgs> = {
  title: 'Components/VgrCheckbox',
  component: 'vgr-checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Kryssruta som kan ha undernivåer. Lägg `vgr-checkbox` inuti en annan för att bygga en hierarki: föräldern markerar alla undernivåer och visar ett mellanläge när bara några är valda. Eventet `vgrChange` skickar `{ value, checked }`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    srOnlyDisabledReason: { control: 'text' },
    collapsibleChildren: { control: 'boolean' },
  },
  args: {
    label: 'Alternativ',
    name: 'option',
    value: 'option',
    checked: false,
    indeterminate: false,
    disabled: false,
    srOnlyDisabledReason: '',
    collapsibleChildren: false,
  },
  render: (args) => html`
    <vgr-checkbox
      .label=${args.label}
      .name=${args.name || undefined}
      .value=${args.value || undefined}
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      .srOnlyDisabledReason=${args.srOnlyDisabledReason || undefined}
      .collapsibleChildren=${args.collapsibleChildren}
    ></vgr-checkbox>
  `,
};

export default meta;

type Story = StoryObj<CheckboxArgs>;

const renderTree: Story['render'] = (args) => html`
  <vgr-checkbox
    .label=${args.label}
    .collapsibleChildren=${args.collapsibleChildren}
  >
    <vgr-checkbox
      label="Undernivå 1"
      value="child-1"
      .checked=${true}
      .collapsibleChildren=${args.collapsibleChildren}
    ></vgr-checkbox>
    <vgr-checkbox
      label="Undernivå 2"
      value="child-2"
      .collapsibleChildren=${args.collapsibleChildren || nothing}
    >
      <vgr-checkbox
        label="Undernivå 2.1"
        value="child-2-1"
        .collapsibleChildren=${args.collapsibleChildren}
      ></vgr-checkbox>
      <vgr-checkbox
        label="Undernivå 2.2"
        value="child-2-2"
        .collapsibleChildren=${args.collapsibleChildren}
      ></vgr-checkbox>
    </vgr-checkbox>
  </vgr-checkbox>
`;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    srOnlyDisabledReason: 'Du saknar behörighet att ändra valet',
  },
};

export const Nested: Story = {
  args: { label: 'Överordnad nivå' },
  render: renderTree,
};

export const Collapsible: Story = {
  args: { label: 'Överordnad nivå', collapsibleChildren: true },
  render: renderTree,
};
