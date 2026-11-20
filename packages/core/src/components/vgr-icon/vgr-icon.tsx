import { Component, Host, Prop, h } from '@stencil/core';

type IconSize = '2.5' | '3' | '4' | '5' | '6';

const sizeClasses: Record<IconSize, string> = {
  '2.5': 'h-2.5',
  '3': 'h-3',
  '4': 'h-4',
  '5': 'h-5',
  '6': 'h-6',
};

@Component({
  tag: 'vgr-icon',
  scoped: true,
})
export class VgrIcon {
  /**
   * SVG markup for the icon. Must come from one of our own icon sources,
   * never from user input, since it is rendered with innerHTML.
   */
  @Prop() icon!: string;

  /**
   * Height in Tailwind's spacing scale (4 = 16px, 6 = 24px). The width follows
   * the icon's own proportions. Defaults to 1em, so the icon follows the
   * surrounding font-size.
   */
  @Prop() size?: IconSize;

  render() {
    const sizeClass = this.size ? sizeClasses[this.size] : 'h-[1em]';

    return (
      <Host aria-hidden="true" class={`inline-flex shrink-0 ${sizeClass}`}>
        <span class="inline-flex h-full [&>svg]:h-full [&>svg]:w-auto" innerHTML={this.icon} />
      </Host>
    );
  }
}
