import { describe, it, expect } from '@stencil/vitest';

import { newSpecPage } from '@stencil/core/testing';
import { VgrButton } from './vgr-button';

describe('vgr-button', () => {
  it('renders with default variant and text content', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button text="Spara" />`,
    });
    expect(page.root).toEqualHtml(`
      <vgr-button>
        <mock:shadow-root>
          <button class="variant-primary" type="button">
            Spara
          </button>
        </mock:shadow-root>
        Spara
      </vgr-button>
    `);
  });

  it('applies the variant prop as a class', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button variant="secondary">Ta bort</vgr-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.className).toBe('variant-secondary');
  });

  it('reflects the disabled prop onto the native button', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button disabled text="Spara" />`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
