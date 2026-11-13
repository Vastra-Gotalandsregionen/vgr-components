import { Component, Host, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-radio-button',
  scoped: true,
})
export class VgrRadioButton {
  private readonly radioId = `vgr-radio-button-${idCount++}`;

  @Prop() disabled = false;
  @Prop() checked: boolean = false;
  @Prop() label: string;

  baseClasses = 'w-6 h-6 rounded-full border-2 border-neutral-text';
  hoverClasses = 'peer-hover:border-3 peer-hover:border-primary-action';
  focusClasses = 'peer-focus:outline-3 peer-focus:outline-primary-action';
  disabledClasses = 'border-neutral-disabled';

  classes = `${this.baseClasses} ${this.hoverClasses} ${this.focusClasses} ${this.disabled && this.disabledClasses}`;

  render() {
    return (
      <Host>
        <label htmlFor={this.radioId} class="flex items-center gap-2 cursor-pointer">
          <input type="radio" class="peer sr-only" id={this.radioId} value={this.radioId} checked={this.checked} />
          <div class={this.classes}>{this.checked && <div class="radio-marker w-2 h-2 rounded-full bg-primary-action absolute top-1/2 left-1/2 -translate-1/2 hidden"></div>}</div>
          {this.label}
        </label>
      </Host>
    );
  }
}
