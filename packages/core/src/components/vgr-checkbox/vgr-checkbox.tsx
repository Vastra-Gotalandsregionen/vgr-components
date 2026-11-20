import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'vgr-checkbox',
  scoped: true,
})
export class VgrCheckbox {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
