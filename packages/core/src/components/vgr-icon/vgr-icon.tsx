import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'vgr-icon',
  scoped: true,
})
export class VgrIcon {
  /**
   * SVG markup for the icon. Must come from our own icon package,
   * never from user input, since it is rendered with innerHTML.
   */
  @Prop() icon!: string;

  render() {
    return (
      <Host aria-hidden="true" class="inline-flex size-[1em] shrink-0">
        <span class="inline-flex size-full [&>svg]:size-full" innerHTML={this.icon} />
      </Host>
    );
  }
}