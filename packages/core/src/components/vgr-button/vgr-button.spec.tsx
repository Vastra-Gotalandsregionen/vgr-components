import { describe, it, expect, render, h } from '@stencil/vitest';

describe('vgr-button', () => {
  it('renders text content', async () => {
    const { root } = await render(<vgr-button text="Spara"></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.textContent?.trim()).toBe('Spara');
  });

  it('uses button as default type', async () => {
    const { root } = await render(<vgr-button text="Spara"></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.getAttribute('type')).toBe('button');
  });

  it('applies submit type', async () => {
    const { root } = await render(<vgr-button text="Spara" type="submit"></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.getAttribute('type')).toBe('submit');
  });

  it('renders disabled styling when disabled', async () => {
    const { root } = await render(<vgr-button text="Spara" disabled></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.className).toContain('cursor-not-allowed');
  });
  ``;

  it('renders primary variant by default', async () => {
    const { root } = await render(<vgr-button text="Spara"></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.className).toContain('bg-primary-action');
  });

  it('renders secondary variant classes', async () => {
    const { root } = await render(<vgr-button text="Spara" variant="secondary"></vgr-button>);

    const button = root.querySelector('button');

    expect(button?.className).toContain('border-primary-action');
  });
});
