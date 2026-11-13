import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type VgrButtonVariant = 'primary' | 'secondary';

let idCount = 0;

@Component({
  tag: 'vgr-button',
  styleUrl: 'vgr-button.css',
  scoped: true,
})
export class VgrButton {
  @Prop() variant: VgrButtonVariant = 'primary';
  @Prop() disabled = false;
  @Prop() srOnlyDisabledReason?: string;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() text!: string;
  @Prop() icon?: string;
  @Prop() vgrAriaLabel?: string;

  @Event() vgrClick: EventEmitter<void>;

  private readonly reasonId = `vgr-button-reason-${idCount++}`;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.vgrClick.emit();
  };

  private getButtonClasses() {
    const baseClasses = `
      inline-flex items-center justify-center gap-2
      rounded-xl
      py-3 px-4
      text-base leading-6
      border-0
      font-sans font-bold
      ${this.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `;

    const variantClasses = {
      primary: `
        ${this.disabled ? 'bg-neutral-disabled text-neutral-text-variant' : 'bg-primary-action text-neutral-text-inverted hover:bg-neutral-text'}
        focus-visible:outline-3
        focus-visible:outline-offset-3
        focus-visible:outline-primary-base-surface-focus
      `,
      secondary: `
        bg-transparent
        border-2
        ${this.disabled ? 'text-neutral-disabled border-neutral-disabled' : 'text-primary-action border-primary-action hover:text-neutral-text'}
        focus-visible:outline-4
        focus-visible:outline-offset-0
        focus-visible:outline-primary-base-surface-focus
      `,
    };

    return `${baseClasses} ${variantClasses[this.variant] || ''}`.trim();
  }

  render() {
    const hasReason = this.disabled && !!this.srOnlyDisabledReason;

    return (
      <Host>
        <button
          class={this.getButtonClasses()}
          type={this.type}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-describedby={hasReason ? this.reasonId : undefined}
          aria-label={this.vgrAriaLabel}
          onClick={this.handleClick}
        >
          {this.icon && <vgr-icon icon={this.icon} />}
          {this.text}
        </button>
        {hasReason && (
          <span id={this.reasonId} class="sr-only">
            {this.srOnlyDisabledReason}
          </span>
        )}
      </Host>
    );
  }
}
