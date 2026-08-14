import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type VgrButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  tag: 'vgr-button',
  styleUrl: 'vgr-button.css',
  shadow: true,
})
export class VgrButton {
  /**
   * Visual style of the button.
   */
  @Prop() variant: VgrButtonVariant = 'primary';

  /**
   * Disables the button and prevents the click event from firing.
   */
  @Prop() disabled = false;

  /**
   * Native button type — matters when the button sits inside a <form>.
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Emitted when the button is clicked (and not disabled).
   */
  @Event() vgrClick: EventEmitter<void>;

  private handleClick = () => {
    if (this.disabled) return;
    this.vgrClick.emit();
  };

  render() {
    return (
      <Host>
        <button class={`variant-${this.variant}`} type={this.type} disabled={this.disabled} onClick={this.handleClick}>
          <slot />
        </button>
      </Host>
    );
  }
}
