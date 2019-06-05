import { Component, ViewEncapsulation } from '@angular/core';
import { AppBase } from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-payment-result',
  template:
    `
      <app-payment-result-desktop *ngIf="isDesktop"></app-payment-result-desktop>
      <app-payment-result-mobile *ngIf="isMobile"></app-payment-result-mobile>
    `,
  encapsulation: ViewEncapsulation.None
})
export class PaymentResultComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
