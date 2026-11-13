import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface VgrTextFieldArgs {
  type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'tel' | 'url';
  label: string;
  value: string;
  placeholder: string;
  helpText: string;
  infoTitle: string;
  infoText: string;
  error: string;
  rows: number;
  disabled: boolean;
  required: boolean;
  optional: boolean;
  autoComplete: boolean;
}

const toInfo = ({
  infoTitle,
  infoText,
}: Pick<VgrTextFieldArgs, 'infoTitle' | 'infoText'>) =>
  infoText ? { title: infoTitle || undefined, text: infoText } : undefined;

const meta: Meta<VgrTextFieldArgs> = {
  title: 'Components/VgrTextField',
  component: 'vgr-text-field',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'textarea',
        'number',
        'email',
        'password',
        'tel',
        'url',
      ],
    },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    infoTitle: { control: 'text', description: 'Rubrik i inforutan (valfri)' },
    infoText: {
      control: 'text',
      description: 'Text i inforutan. Tom text ger ingen inforuta.',
    },
    error: { control: 'text' },
    rows: {
      control: 'number',
      description: 'Används bara när type är textarea',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    autoComplete: { control: 'boolean' },
  },
  args: {
    type: 'text',
    label: 'Förnamn',
    value: '',
    placeholder: '',
    helpText: '',
    infoTitle: '',
    infoText: '',
    error: '',
    rows: 4,
    disabled: false,
    required: false,
    optional: false,
    autoComplete: false,
  },
  render: (args) => html`
    <div style="max-width: 24rem; padding: 1rem 1rem 10rem;">
      <vgr-text-field
        .type=${args.type}
        .label=${args.label}
        .value=${args.value}
        .placeholder=${args.placeholder}
        .helpText=${args.helpText}
        .info=${toInfo(args)}
        .error=${args.error}
        .rows=${args.rows}
        .disabled=${args.disabled}
        .required=${args.required}
        .optional=${args.optional}
        .autoComplete=${args.autoComplete}
      ></vgr-text-field>
    </div>
  `,
};

export default meta;
type Story = StoryObj<VgrTextFieldArgs>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Anna' },
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Skriv ditt förnamn' },
};

export const Required: Story = {
  args: { required: true },
};

export const Optional: Story = {
  args: { optional: true },
};

export const WithHelpText: Story = {
  args: { helpText: 'Som det står i ditt pass.' },
};

export const WithInfo: Story = {
  args: {
    label: 'Personnummer',
    infoText:
      'Personnumret används för att identifiera dig i våra system. Ange tolv siffror.',
  },
};

export const WithInfoAndTitle: Story = {
  args: {
    label: 'Dokumenttyp',
    infoTitle: 'Regionövergripande dokument',
    infoText:
      'Inkluderar övergripande dokument som gäller för alla verksamheter och förvaltningar i Västra Götalandsregionen.',
  },
};

export const WithError: Story = {
  args: {
    label: 'E-post',
    type: 'email',
    value: 'anna@',
    error: 'Ange en giltig e-postadress',
  },
};

export const Disabled: Story = {
  args: { value: 'Går inte att ändra', disabled: true },
};

export const Textarea: Story = {
  args: {
    type: 'textarea',
    label: 'Meddelande',
    rows: 5,
    helpText: 'Max 500 tecken.',
  },
};

export const Password: Story = {
  args: { type: 'password', label: 'Lösenord', required: true },
};

export const Number: Story = {
  args: { type: 'number', label: 'Antal', value: '3' },
};
