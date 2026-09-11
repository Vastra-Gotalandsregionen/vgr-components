import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type VgrButtonVariant = 'primary' | 'secondary';

@Component({
  tag: 'vgr-button',
  styleUrl: 'vgr-button.css',
  shadow: true,
  scoped: false,
})
export class VgrButton {
  @Prop() variant: VgrButtonVariant = 'primary';
  @Prop() disabled = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() text: String;

  @Event() vgrClick: EventEmitter<void>;

  private handleClick = () => {
    if (this.disabled) return;
    this.vgrClick.emit();
  };

  render() {
    return (
      <Host>
        <button class={`vgr-button variant-${this.variant}`} type={this.type} disabled={this.disabled} onClick={this.handleClick}>
          {this.text}
        </button>
      </Host>
    );
  }
}
