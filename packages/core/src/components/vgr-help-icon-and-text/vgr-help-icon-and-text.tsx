import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';
import { helpCircle, close } from '../../assets/svgs.generated';
import { VgrInfoContent } from '../../types/vgr-info-content';

let nextId = 0;

@Component({
  tag: 'vgr-help-icon-and-text',
  scoped: true,
})
export class VgrHelpIconAndText {
  @Prop() info?: VgrInfoContent;
  @Prop() vgrAriaLabel?: string;

  @Element() el: HTMLElement;

  @State() isOpen = false;

  private readonly infoId = `vgr-help-info-${nextId++}`;
  private readonly anchorName = `--${this.infoId}`;
  private readonly supportsAnchor = typeof CSS !== 'undefined' && CSS.supports('position-area', 'bottom');
  private toggleButton?: HTMLButtonElement;

  private readonly toggle = () => {
    this.isOpen = !this.isOpen;
  };

  private readonly close = () => {
    this.isOpen = false;
    // Move focus back to toggle button
    this.toggleButton?.focus();
  };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      event.stopPropagation();
      this.close();
    }
  };

  // Click outside handler
  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.isOpen) return;
    if (event.composedPath().includes(this.el)) return;
    this.isOpen = false;
  }

  render() {
    /**
     * Classes
     */
    let buttonClasses = ['p-1 rounded-sm min-w-6 min-h-6 max-h-6 max-w-6 flex items-center justify-center cursor-pointer'];

    // Hover
    buttonClasses.push('hover:outline-3 hover:outline-primary-base-surface-focus hover:text-black');

    // Focus
    buttonClasses.push('focus:bg-primary-base-surface-focus focus:text-white focus:outline-none');

    const _buttonClasses = buttonClasses.join(' ');

    return (
      <Host onKeyDown={this.onKeyDown} class="inline-block relative mx-2">
        <button
          type="button"
          class={_buttonClasses}
          aria-label={this.vgrAriaLabel ?? 'Visa information'}
          aria-expanded={this.isOpen ? 'true' : 'false'}
          aria-controls={this.infoId}
          onClick={this.toggle}
          ref={el => (this.toggleButton = el)}
          style={this.supportsAnchor ? { 'anchor-name': this.anchorName } : undefined}
        >
          <vgr-icon icon={helpCircle}></vgr-icon>
        </button>
        {this.isOpen && (
          <div>
            <div
              id={this.infoId}
              class="mt-3.5 -ml-0.5 flex items-start border border-accent-brown rounded-sm p-6 gap-3 bg-status-information-surface text-status-information-text w-fit"
              style={
                this.supportsAnchor
                  ? {
                      'position-anchor': this.anchorName,
                      'position': 'fixed',
                      'top': 'anchor(bottom)',
                      'inset-inline': '0.5rem',
                      'justify-self': 'anchor-center',
                    }
                  : {
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }
              }
            >
              <p class="max-w-[30ch]">
                <span class="font-bold block">{this.info.title}</span>
                {this.info.text}
              </p>
              <button type="button" class={_buttonClasses} onClick={this.close} ariaLabel="Dölj information">
                <vgr-icon icon={close}></vgr-icon>
              </button>
            </div>
            <div
              aria-hidden="true"
              class="rotate-45 w-4.5 h-4.5 z-1 border-l border-t border-accent-brown bg-status-information-surface"
              style={
                this.supportsAnchor
                  ? {
                      'position-anchor': this.anchorName,
                      'position': 'fixed',
                      'top': 'anchor(bottom)',
                      'left': 'anchor(center)',
                      'translate': '-50% 0',
                      'margin-top': '5px',
                    }
                  : {
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      translate: '-50% 0',
                      marginTop: '5px',
                    }
              }
            ></div>
          </div>
        )}
        <div role="status" class="sr-only">
          {this.isOpen ? [this.info?.title, this.info?.text].filter(Boolean).join('. ') : ''}
        </div>
      </Host>
    );
  }
}
