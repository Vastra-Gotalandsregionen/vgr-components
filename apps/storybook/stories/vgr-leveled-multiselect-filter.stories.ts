import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type FilterArgs = {
  initialVisible: number;
  itemCount: number;
};

const renderItem = (number: number) => html`
  <vgr-checkbox label="Kategori ${number}" value="category-${number}">
    <vgr-checkbox
      label="Underkategori ${number}.1"
      value="category-${number}-1"
    >
      <vgr-checkbox
        label="Underkategori ${number}.1.1"
        value="category-${number}-1-1"
      ></vgr-checkbox>
    </vgr-checkbox>
    <vgr-checkbox
      label="Underkategori ${number}.2"
      value="category-${number}-2"
    ></vgr-checkbox>
  </vgr-checkbox>
`;

const meta: Meta<FilterArgs> = {
  title: 'Components/VgrLeveledMultiSelectFilter',
  component: 'vgr-leveled-multiselect-filter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Filter med flerval i flera nivåer. Lägg `vgr-checkbox` inuti komponenten och nästla dem för att skapa undernivåer. Alla nivåer blir hopfällbara. Finns det fler toppnivåer än `initialVisible` visas knappen ”Visa fler”. Lyssna på `vgrChange` för att veta vad som valts.',
      },
    },
  },
  argTypes: {
    initialVisible: { control: { type: 'number', min: 1 } },
    itemCount: { table: { disable: true } },
  },
  args: {
    initialVisible: 10,
    itemCount: 15,
  },
  render: (args) => html`
    <vgr-leveled-multiselect-filter .initialVisible=${args.initialVisible}>
      ${Array.from({ length: args.itemCount }, (_, index) => renderItem(index + 1))}
    </vgr-leveled-multiselect-filter>
  `,
};

export default meta;

type Story = StoryObj<FilterArgs>;

export const Default: Story = {};

export const FewItems: Story = {
  args: { itemCount: 5 },
};

export const CustomInitialVisible: Story = {
  args: { initialVisible: 3 },
};
