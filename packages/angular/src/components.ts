/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@vastra-gotalandsregionen/components-core/components';

import { defineCustomElement as defineVgrButton } from '@vastra-gotalandsregionen/components-core/components/vgr-button.js';
import { defineCustomElement as defineVgrHelpIconAndText } from '@vastra-gotalandsregionen/components-core/components/vgr-help-icon-and-text.js';
import { defineCustomElement as defineVgrIcon } from '@vastra-gotalandsregionen/components-core/components/vgr-icon.js';
import { defineCustomElement as defineVgrTextField } from '@vastra-gotalandsregionen/components-core/components/vgr-text-field.js';
@ProxyCmp({
  defineCustomElementFn: defineVgrButton,
  inputs: ['disabled', 'icon', 'text', 'type', 'variant', 'vgrAriaLabel']
})
@Component({
  selector: 'vgr-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'icon', { name: 'text', required: true }, 'type', 'variant', 'vgrAriaLabel'],
  outputs: ['vgrClick'],
})
export class VgrButton {
  protected el: HTMLVgrButtonElement;
  @Output() vgrClick = new EventEmitter<VgrButtonCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { VgrButtonCustomEvent } from '@vastra-gotalandsregionen/components-core/components';

export declare interface VgrButton extends Components.VgrButton {

  vgrClick: EventEmitter<VgrButtonCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineVgrHelpIconAndText,
  inputs: ['info']
})
@Component({
  selector: 'vgr-help-icon-and-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['info'],
})
export class VgrHelpIconAndText {
  protected el: HTMLVgrHelpIconAndTextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface VgrHelpIconAndText extends Components.VgrHelpIconAndText {}


@ProxyCmp({
  defineCustomElementFn: defineVgrIcon,
  inputs: ['icon']
})
@Component({
  selector: 'vgr-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'icon', required: true }],
})
export class VgrIcon {
  protected el: HTMLVgrIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface VgrIcon extends Components.VgrIcon {}


@ProxyCmp({
  defineCustomElementFn: defineVgrTextField,
  inputs: ['autoComplete', 'disabled', 'error', 'helpText', 'info', 'label', 'optional', 'placeholder', 'required', 'rows', 'type', 'value']
})
@Component({
  selector: 'vgr-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'disabled', 'error', 'helpText', 'info', 'label', 'optional', 'placeholder', 'required', 'rows', 'type', 'value'],
})
export class VgrTextField {
  protected el: HTMLVgrTextFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface VgrTextField extends Components.VgrTextField {}


