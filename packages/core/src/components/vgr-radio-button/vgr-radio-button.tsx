import { Component, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-radio-button',
  scoped: true,
})
export class VgrRadioButton {
  private readonly radioId = `vgr-radio-button-${idCount++}`;
  private readonly reasonId = `${this.radioId}-reason`;
  private inputEl?: HTMLInputElement;

  @Prop() disabled = false;
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() name: string;
  @Prop() value?: string;
  @Prop() label: string;
  @Prop() srOnlyDisabledReason?: string;

  @Event() vgrChange: EventEmitter<{ value?: string; checked: boolean }>;

  @Listen('change', { target: 'document' })
  handleGroupChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!this.inputEl || target === this.inputEl) return;
    if (!this.name || target.name !== this.name || target.form !== this.inputEl.form) return;
    this.checked = this.inputEl.checked;
  }

  private readonly handleChange = () => {
    this.checked = this.inputEl.checked;
    this.vgrChange.emit({ value: this.value, checked: this.checked });
  };

  private readonly handleClick = (event: MouseEvent) => {
    if (this.disabled) event.preventDefault();
  };

  render() {
    const hasReason = this.disabled && !!this.srOnlyDisabledReason;

    const labelClasses = ['flex items-center gap-2 text-base leading-6', this.disabled ? 'text-neutral-disabled cursor-not-allowed' : 'text-neutral-text cursor-pointer'].join(' ');

    const ringClasses = this.disabled ? 'stroke-neutral-disabled' : this.checked ? 'stroke-primary-action' : 'stroke-neutral-text';

    const dotClasses = ['dot opacity-0', this.disabled ? 'fill-neutral-disabled' : 'fill-primary-action'].join(' ');

    const svgClasses = [
      'w-6 h-6 shrink-0 rounded-full',
      'peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-primary-base-30',
      'peer-checked:[&>.dot]:opacity-100',
      this.disabled ? '' : 'peer-hover:[&>.ring-hover]:opacity-100',
    ].join(' ');

    return (
      <Host>
        <label htmlFor={this.radioId} class={labelClasses}>
          <input
            type="radio"
            class="peer sr-only"
            id={this.radioId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            onChange={this.handleChange}
            onClick={this.handleClick}
            ref={el => (this.inputEl = el)}
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-describedby={hasReason ? this.reasonId : undefined}
          />
          <svg class={svgClasses} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="none" stroke-width="2" class={ringClasses} />
            <circle cx="12" cy="12" r="10.5" fill="none" stroke-width="3" class="ring-hover opacity-0 stroke-primary-action" />
            <circle cx="12" cy="12" r="7" class={dotClasses} />
          </svg>
          {this.label}
        </label>
        {hasReason && (
          <span id={this.reasonId} class="sr-only">
            {this.srOnlyDisabledReason}
          </span>
        )}
      </Host>
    );
  }
}
