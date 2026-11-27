import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const coreDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const storiesDir = resolve(coreDir, '../../apps/storybook/stories');

async function askForName() {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await readline.question('Component name (e.g. vgr-my-component): ');
  readline.close();
  return answer;
}

const tag = (process.argv[2] ?? (await askForName())).trim();

if (!/^vgr(-[a-z0-9]+)+$/.test(tag)) {
  console.error(`Invalid name "${tag}". Use the format vgr-my-component.`);
  process.exit(1);
}

const className = tag
  .split('-')
  .map(part => part[0].toUpperCase() + part.slice(1))
  .join('');

const componentDir = join(coreDir, 'src/components', tag);
const componentFile = join(componentDir, `${tag}.tsx`);
const specFile = join(componentDir, `${tag}.spec.tsx`);
const storyFile = join(storiesDir, `${tag}.stories.ts`);

const existing = [componentDir, storyFile].filter(path => existsSync(path));

if (existing.length) {
  console.error(`Already exists:\n${existing.join('\n')}`);
  process.exit(1);
}

const component = `import { Component, Host, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: '${tag}',
  scoped: true,
})
export class ${className} {
  private readonly componentId = \`${tag}-\${idCount++}\`;

  render() {
    return <Host id={this.componentId}></Host>;
  }
}
`;

const spec = `import { describe, it, expect, render, h } from '@stencil/vitest';

describe('${tag}', () => {
  it('renders with a generated id', async () => {
    const { root } = await render(<${tag}></${tag}>);

    expect(root.id).toMatch(/^${tag}-\\d+$/);
  });
});
`;

const story = `import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/${className}',
  component: '${tag}',
  render: () => html\`<${tag}></${tag}>\`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
`;

mkdirSync(componentDir, { recursive: true });
mkdirSync(storiesDir, { recursive: true });

for (const [file, content] of [
  [componentFile, component],
  [specFile, spec],
  [storyFile, story],
]) {
  writeFileSync(file, content, { flag: 'wx' });
  console.log(`Created ${file}`);
}
