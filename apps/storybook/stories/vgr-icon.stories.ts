import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { arrowRight, check, plus } from '../src/placeholder-icons';

const icons = { arrowRight, check, plus };

interface VgrIconArgs {
  icon: keyof typeof icons;
  size: number;
}

const meta: Meta<VgrIconArgs> = {
  title: 'Components/VgrIcon',
  render: (args) => html`
    <vgr-icon .icon=${icons[args.icon]} style="font-size: ${args.size}px"></vgr-icon>
  `,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['arrowRight', 'check', 'plus'],
    },
    size: { control: { type: 'number' }, description: 'Font size in px. The icon is 1em.' },
  },
  args: {
    icon: 'arrowRight',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<VgrIconArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      ${[16, 24, 32, 48].map(
        (size) => html`<vgr-icon .icon=${arrowRight} style="font-size: ${size}px"></vgr-icon>`,
      )}
    </div>
  `,
};

export const Placeholders: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; font-size: 32px;">
      <vgr-icon .icon=${arrowRight}></vgr-icon>
      <vgr-icon .icon=${check}></vgr-icon>
      <vgr-icon .icon=${plus}></vgr-icon>
    </div>
  `,
};