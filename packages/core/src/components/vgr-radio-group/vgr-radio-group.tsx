import { Component, Host, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-radio-group',
  scoped: true,
})
export class VgrRadioGroup {
  private readonly groupId = `vgr-radio-group-${idCount++}`;

  @Prop() label!: string;
  @Prop() helpText?: string;
  @Prop() error?: string;
  @Prop() required: boolean = false;
  @Prop() optional: boolean = false;

  render() {
    const helperId = `${this.groupId}-helper`;
    const errorId = `${this.groupId}-error`;

    const showHelp = !!this.helpText && !this.error;
    const showError = !!this.error;

    const describedByIds = [showHelp && helperId, showError && errorId].filter(Boolean);
    const describedBy = describedByIds.length ? describedByIds.join(' ') : undefined;

    return (
      <Host>
        <fieldset
          role="radiogroup"
          class="m-0 min-w-0 border-0 p-0"
          aria-required={this.required ? 'true' : undefined}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy || undefined}
        >
          <legend class="flex mb-3 text-base font-bold leading-text-field-label text-neutral-text">
            {this.label}

            {this.required && <span class="text-status-error-text block ml-1">*</span>}
            {this.optional && <span class="text-neutral-text-variant block ml-2 font-normal">(frivillig)</span>}
          </legend>

          <div class="flex flex-col gap-y-3 mb-2">
            <slot></slot>
          </div>
          {showHelp && (
            <p id={helperId} class="block text-neutral-text-variant leading-text-field-help-text">
              {this.helpText}
            </p>
          )}
          {showError && (
            <p id={errorId} class="block text-status-error-text leading-text-field-help-text">
              *{this.error}
            </p>
          )}
        </fieldset>
      </Host>
    );
  }
}
