import { render, h, describe, it, expect } from '@stencil/vitest';

import { newSpecPage } from '@stencil/core/testing';
import { VgrButton } from './vgr-button';

describe('vgr-button', () => {
  it('renders with default variant and slotted content', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button>Spara</vgr-button>`,
    });
    expect(page.root).toEqualHtml(`
      <vgr-button>
        <mock:shadow-root>
          <button class="variant-primary" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Spara
      </vgr-button>
    `);
  });

  it('applies the variant prop as a class', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button variant="danger">Ta bort</vgr-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.className).toBe('variant-danger');
  });

  it('reflects the disabled prop onto the native button', async () => {
    const page = await newSpecPage({
      components: [VgrButton],
      html: `<vgr-button disabled>Spara</vgr-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
