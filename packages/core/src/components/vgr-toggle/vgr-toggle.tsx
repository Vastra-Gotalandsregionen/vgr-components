import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'vgr-toggle',
  scoped: true,
})
export class VgrToggle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
