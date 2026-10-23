import { Component, Host, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-text-field',
  scoped: true,
})
export class VgrTextField {
  private inputId = `vgr-text-field-${idCount++}`;

  @Prop() type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'tel' | 'url' = 'text';
  @Prop() disabled = false;
  @Prop() autoComplete: boolean = false;
  @Prop() value: string | number;
  @Prop() helperText?: string;
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() error?: string;
  /** `rows` is only applied for type: textarea */
  @Prop() rows?: number;

  render() {
    const helperId = `${this.inputId}-helper`;
    const errorId = `${this.inputId}-error`;
    const describedBy = this.error ? errorId : this.helperText ? helperId : undefined;
    const autocomplete = this.autoComplete ? 'on' : 'off';

    const sharedProps = {
      autoComplete: autocomplete,
      ariaDescribedby: describedBy,
      ariaInvalid: this.error ? 'true' : undefined,
      disabled: this.disabled,
      placeholder: this.placeholder,
      id: this.inputId,
    };

    return (
      <Host>
        <div class="block">
          {this.label && (
            <label class="block" htmlFor={this.inputId}>
              {this.label}
            </label>
          )}
          {this.type === 'textarea' ? (
            <textarea class="block" rows={this.rows} value={this.value?.toString()} {...sharedProps} />
          ) : (
            <input class="block" type={this.type} value={this.value} {...sharedProps} />
          )}
          {this.helperText && !this.error && (
            <p id={helperId} class="block">
              {this.helperText}
            </p>
          )}
          {this.error && (
            <p id={errorId} class="block">
              {this.error}
            </p>
          )}
        </div>
      </Host>
    );
  }
}
