import { describe, it, expect, render, h } from '@stencil/vitest';

describe('vgr-icon', () => {
  const testIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z"/></svg>';

  it('renders the svg passed via the icon prop', async () => {
    const { root } = await render(<vgr-icon icon={testIcon}></vgr-icon>);

    expect(root.innerHTML).toContain('M0 0h24v24H0z');
  });

  it('renders no svg when icon is empty', async () => {
    const { root } = await render(<vgr-icon icon=""></vgr-icon>);

    expect(root.innerHTML).not.toContain('<path');
  });

  it('is hidden from assistive technology', async () => {
    const { root } = await render(<vgr-icon icon={testIcon}></vgr-icon>);

    expect(root.getAttribute('aria-hidden')).toBe('true');
  });
});
