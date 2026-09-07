/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@vgregion/components-core/components';

import { defineCustomElement as defineVgrButton } from '@vgregion/components-core/components/vgr-button.js';
@ProxyCmp({
  defineCustomElementFn: defineVgrButton,
  inputs: ['disabled', 'type', 'variant']
})
@Component({
  selector: 'vgr-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'type', 'variant'],
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


import type { VgrButtonCustomEvent } from '@vgregion/components-core/components';

export declare interface VgrButton extends Components.VgrButton {
  /**
   * Emitted when the button is clicked (and not disabled).
   */
  vgrClick: EventEmitter<VgrButtonCustomEvent<void>>;
}


