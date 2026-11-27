import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

interface VgrChoiceGroupArgs {
  label: string;
  helpText?: string;
  error?: string;
  required: boolean;
  optional: boolean;
}

const renderGroup = (
  args: VgrChoiceGroupArgs,
  name: string,
  options: { disabledOption?: boolean; checkedValue?: string } = {}
) => html`
  <vgr-choice-group
    label=${args.label}
    help-text=${ifDefined(args.helpText || undefined)}
    error=${ifDefined(args.error || undefined)}
    ?required=${args.required}
    ?optional=${args.optional}
  >
    <vgr-radio-button
      name=${name}
      value="red"
      label="Röd"
      ?checked=${options.checkedValue === 'red'}
    ></vgr-radio-button>
    <vgr-radio-button
      name=${name}
      value="green"
      label="Grön"
      ?checked=${options.checkedValue === 'green'}
    ></vgr-radio-button>
    <vgr-radio-button
      name=${name}
      value="blue"
      label="Blå"
      ?disabled=${options.disabledOption}
      sr-only-disabled-reason=${ifDefined(options.disabledOption ? 'Blå är slut' : undefined)}
    ></vgr-radio-button>
    <vgr-radio-button
      name=${name}
      value="yellow"
      label="Gul"
      ?checked=${options.checkedValue === 'yellow'}
    ></vgr-radio-button>
  </vgr-choice-group>
`;

const meta: Meta<VgrChoiceGroupArgs> = {
  title: 'Components/VgrChoiceGroup',
  component: 'vgr-choice-group',
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    helpText: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    required: { control: { type: 'boolean' } },
    optional: { control: { type: 'boolean' } },
  },
  args: {
    label: 'Välj färg',
    helpText: '',
    error: '',
    required: false,
    optional: false,
  },
  render: (args, context) => renderGroup(args, context.id),
};

export default meta;
type Story = StoryObj<VgrChoiceGroupArgs>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: { helpText: 'Du kan ändra ditt val senare' },
};

export const Required: Story = {
  args: { required: true },
};

export const Optional: Story = {
  args: { optional: true },
};

export const WithError: Story = {
  args: { required: true, error: 'Du måste välja en färg' },
};

export const WithPreselected: Story = {
  render: (args, context) =>
    renderGroup(args, context.id, { checkedValue: 'green' }),
};

export const WithDisabledOption: Story = {
  render: (args, context) =>
    renderGroup(args, context.id, {
      disabledOption: true,
      checkedValue: 'green',
    }),
};
