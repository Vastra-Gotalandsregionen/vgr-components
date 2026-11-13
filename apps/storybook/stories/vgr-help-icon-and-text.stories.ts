import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface VgrHelpIconAndTextArgs {
  infoTitle: string;
  infoText: string;
}

const toInfo = ({ infoTitle, infoText }: VgrHelpIconAndTextArgs) => ({
  title: infoTitle || undefined,
  text: infoText,
});

const meta: Meta<VgrHelpIconAndTextArgs> = {
  title: 'Components/VgrHelpIconAndText',
  component: 'vgr-help-icon-and-text',
  tags: ['autodocs'],
  argTypes: {
    infoTitle: { control: 'text', description: 'Rubrik i rutan (valfri)' },
    infoText: { control: 'text' },
  },
  args: {
    infoTitle: '',
    infoText:
      'Här står en kort förklaring som hjälper användaren att förstå vad som ska fyllas i.',
  },
  render: (args) => html`
    <div style="padding: 6rem 2rem;">
      <vgr-help-icon-and-text .info=${toInfo(args)}></vgr-help-icon-and-text>
    </div>
  `,
};

export default meta;
type Story = StoryObj<VgrHelpIconAndTextArgs>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: { infoTitle: 'Regionövergripande dokument' },
};

export const LongText: Story = {
  args: {
    infoText:
      'Det här är en betydligt längre förklaring som sträcker sig över flera rader, för att vi ska se hur rutan och pilen beter sig när innehållet blir större.',
  },
};

// Knappen ligger vid högerkanten så att man kan kontrollera att rutan hålls inom
// skärmen medan pilen fortsätter peka på knappen.
export const NearRightEdge: Story = {
  render: (args) => html`
    <div style="padding: 6rem 0; display: flex; justify-content: flex-end;">
      <vgr-help-icon-and-text .info=${toInfo(args)}></vgr-help-icon-and-text>
    </div>
  `,
};

// Knappen ligger vid vänsterkanten, samma kontroll åt andra hållet.
export const NearLeftEdge: Story = {
  render: (args) => html`
    <div style="padding: 6rem 0;">
      <vgr-help-icon-and-text .info=${toInfo(args)}></vgr-help-icon-and-text>
    </div>
  `,
};

// Kontrollerar positioneringen när sidan har scrollats ner till rutan.
export const InsideScrollablePage: Story = {
  render: (args) => html`
    <div style="height: 150vh; padding-top: 80vh; padding-left: 2rem;">
      <vgr-help-icon-and-text .info=${toInfo(args)}></vgr-help-icon-and-text>
    </div>
  `,
};
