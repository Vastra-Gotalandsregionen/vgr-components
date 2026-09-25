import { describe, it, expect, render, h } from '@stencil/vitest';

describe('vgr-icon', () => {
  it('renders default slot content', async () => {
    const { root } = await render(<vgr-icon></vgr-icon>);

    expect(root.shadowRoot?.textContent).toContain('Iconic! ✌️');
  });
});
