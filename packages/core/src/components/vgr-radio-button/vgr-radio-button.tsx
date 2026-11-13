import { Component, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-radio-button',
  scoped: true,
})
export class VgrRadioButton {
  private readonly radioId = `vgr-radio-button-${idCount++}`;
  private inputEl?: HTMLInputElement;

  @Prop() disabled = false;
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() label: string;

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

  render() {
    const markerClasses = [
      "after:content-[''] after:hidden peer-checked:after:block after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 after:w-2 after:h-2 after:rounded-full",
      this.disabled ? 'after:bg-neutral-disabled' : 'after:bg-primary-action',
    ];
    const circleClasses = [
      'relative w-6 h-6 rounded-full border-2',
      this.disabled ? 'border-neutral-disabled' : 'border-neutral-text peer-hover:border-3 peer-hover:border-primary-action',
      'peer-focus:outline-3 peer-focus:outline-primary-action',
      markerClasses.join(' '),
    ].join(' ');

    return (
      <Host>
        <label htmlFor={this.radioId} class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            class="peer sr-only"
            id={this.radioId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            onChange={this.handleChange}
            ref={el => (this.inputEl = el)}
          />
          <div class={circleClasses}></div>
          {this.label}
        </label>
      </Host>
    );
  }
}
