import { Component, Host, h } from '@stencil/core';
import { helpCircle } from '../../assets/svgs.generated';

@Component({
  tag: 'vgr-help-icon-and-text',
  scoped: true,
})
export class VgrHelpIconAndText {
  render() {
    return (
      <Host>
        <vgr-icon icon={helpCircle}></vgr-icon>
        <slot></slot>
      </Host>
    );
  }
}
