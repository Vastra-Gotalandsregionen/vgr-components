import { Component, Host, Prop, h } from '@stencil/core';

let idCount = 0;

@Component({
  tag: 'vgr-choice-group',
  scoped: true,
})
export class VgrChoiceGroup {
  private readonly groupId = `vgr-choice-group-${idCount++}`;

  @Prop() type!: 'radio' | 'checkbox';
  @Prop() label?: string;
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

    const isRadio = this.type === 'radio';

    const containerClasses = this.error ? 'w-fit border-3 border-status-error-text rounded-checkbox-bg p-6 pr-12 mb-2' : '';

    return (
      <Host>
        <fieldset
          role={isRadio ? 'radiogroup' : 'group'}
          class="block m-0 min-w-0 border-0 p-0 text-neutral-text"
          aria-required={isRadio && this.required ? 'true' : undefined}
          aria-invalid={this.error ? 'true' : undefined}
          aria-describedby={describedBy}
        >
          <div class={containerClasses}>
            {this.label && (
              <div>
                <legend class="flex items-center p-0 mb-3 text-base font-bold leading-text-field-label">
                  {this.label}
                  {this.required && <span class="text-status-error-text block ml-1">*</span>}
                  {this.optional && <span class="text-neutral-text-variant block ml-2 font-normal">(frivillig)</span>}
                </legend>
              </div>
            )}
            <div class="flex flex-col gap-y-3 mb-2">
              <slot></slot>
            </div>
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
