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
  @Prop() optional: boolean = false;
  @Prop() value: string | number;
  @Prop() info?: string;
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
    let sharedClasses = ['block bg-elevation-elevation-1 border-2 rounded-text-field pl-3 pr-6'];
    if (!this.error) sharedClasses.push('border-neutral-border');
    // Hover
    sharedClasses.push('hover:shadow-text-field');

    // Focus
    sharedClasses.push('focus-visible:outline-4');

    if (!!this.error) {
      sharedClasses.push('outline-status-error-text');
    } else {
      sharedClasses.push('focus-visible:outline-primary-base');
    }

    // Error
    if (!!this.error) sharedClasses.push('border-status-error-text');

    // TODO: Disabled styling

    // Finalize class list
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
          <div class="mb-2">
            {this.label && (
              <label class="flex items-center text-base font-bold leading-text-field-label" htmlFor={this.inputId}>
                {this.label}
                {this.required && <span class="text-status-error-text block ml-1">*</span>}
                {this.optional && <span class="text-neutral-text-variant block ml-2 font-normal">(frivillig)</span>}
                {this.info && <span class="border-3 border-primary-action text-primary-action w-5 h-5 flex items-center justify-center rounded-full ml-2">?</span>}
              </label>
            )}
          </div>
          {this.type === 'textarea' ? (
            <textarea rows={this.rows} value={this.value?.toString()} {...sharedProps} />
          ) : (
            <input type={this.type} value={this.value} {...sharedProps} />
          )}
          {this.helpText && !this.error && (
            <p id={helperId} class="block text-neutral-text-variant mt-2 leading-text-field-help-text">
              {this.helpText}
            </p>
          )}
          {this.error && (
            <p id={errorId} class="block text-status-error-text mt-2 leading-text-field-help-text">
              {this.error}
            </p>
          )}
        </div>
      </Host>
    );
  }
}
