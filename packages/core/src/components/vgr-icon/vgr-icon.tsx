import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'vgr-icon',
  styleUrl: 'vgr-icon.css',
  shadow: true,
})
export class VgrIcon {
  render() {
    return (
      <Host>
        <div class="icon">
          <slot>Iconic! ✌️</slot>
        </div>
      </Host>
    );
  }
}
