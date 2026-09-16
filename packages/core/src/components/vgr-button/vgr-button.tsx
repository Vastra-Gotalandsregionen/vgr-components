import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type VgrButtonVariant = 'primary' | 'secondary';

@Component({
  tag: 'vgr-button',
  styleUrl: 'vgr-button.css',
  scoped: true,
})
export class VgrButton {
  @Prop() variant: VgrButtonVariant = 'primary';
  @Prop() disabled = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() text: string;

  @Event() vgrClick: EventEmitter<void>;

  private handleClick = () => {
    if (this.disabled) return;
    this.vgrClick.emit();
  };

  private getButtonClasses() {
    const baseClasses = `
      rounded-xl
      py-3 px-4
      text-base leading-6
      border-0
      font-sans font-bold
      ${this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `;

    const variantClasses = {
      primary: `
        bg-[var(--primary-action)]
        text-[var(--neutral-text-inverted)]
        hover:bg-[var(--neutral-text)]
        disabled:bg-[var(--neutral-divider)]
        disabled:text-[var(--neutral-text-variant)]
      `,
      secondary: `
        bg-transparent
        text-[var(--primary-action)]
        border-2 border-[var(--primary-action)]
        hover:text-[var(--neutral-text)]
        disabled:text-[var(--neutral-divider)]
      `,
    };

    return `${baseClasses} ${variantClasses[this.variant] || ''}`.trim();
  }

  render() {
    return (
      <Host>
        <button class={this.getButtonClasses()} type={this.type} disabled={this.disabled} onClick={this.handleClick}>
          {this.text}
        </button>
      </Host>
    );
  }
}
