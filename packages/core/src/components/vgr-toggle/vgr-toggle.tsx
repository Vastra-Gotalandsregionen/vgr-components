import { Component, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-toggle',
  scoped: true,
})
export class VgrToggle {
  private readonly toggleId = `vgr-toggle-button-${idCount++}`;
  private readonly reasonId = `${this.toggleId}-reason`;
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

    return (
      <Host>
        <label htmlFor={this.toggleId} class={labelClasses}>
          <input
            type="checkbox"
            role="switch"
            class="peer sr-only"
            id={this.toggleId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            onChange={this.handleChange}
            onClick={this.handleClick}
            ref={el => (this.inputEl = el)}
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-describedby={hasReason ? this.reasonId : undefined}
          />
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
