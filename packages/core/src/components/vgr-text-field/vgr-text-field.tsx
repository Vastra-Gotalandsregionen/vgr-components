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
  @Prop() required: boolean = false;
  @Prop() value: string | number;
  @Prop() helpText?: string;
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() error?: string;
  /** `rows` is only applied for type: textarea */
  @Prop() rows?: number;

  render() {
    const helperId = `${this.inputId}-helper`;
    const errorId = `${this.inputId}-error`;
    const describedBy = this.error ? errorId : this.helpText ? helperId : undefined;
    const autocomplete = this.autoComplete ? 'on' : 'off';

    /**
     * Classes
     */
    // Shared by inputs and textareas
    let sharedClasses = ['block bg-elevation-elevation-1 border-2 border-neutral-border rounded-text-field pl-3 pr-6'];
    // Hover
    sharedClasses.push('hover:shadow-text-field');

    // Focus
    sharedClasses.push('focus-visible:outline-4 focus-visible:outline-primary-base');

    const _sharedClasses = sharedClasses.join(' ');

    // Input/textarea specific
    const inputClasses = 'py-2.5';
    const textareaClasses = 'py-2';

    /**
     * Props
     */
    const sharedProps = {
      autoComplete: autocomplete,
      ariaDescribedby: describedBy,
      ariaInvalid: this.error ? 'true' : undefined,
      disabled: this.disabled,
      placeholder: this.placeholder,
      id: this.inputId,
      required: this.required,
      class: `${_sharedClasses} ${this.type === 'textarea' ? textareaClasses : inputClasses}`,
    };

    return (
      <Host>
        <div class="block text-neutral-text">
          {this.label && (
            <label class="block text-base font-bold leading-text-field-label mb-2" htmlFor={this.inputId}>
              {this.label}
              {this.required && <span class="text-status-error-text">*</span>}
            </label>
          )}
          {this.type === 'textarea' ? (
            <textarea rows={this.rows} value={this.value?.toString()} {...sharedProps} />
          ) : (
            <input type={this.type} value={this.value} {...sharedProps} />
          )}
          {this.helpText && !this.error && (
            <p id={helperId} class="block">
              {this.helpText}
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
