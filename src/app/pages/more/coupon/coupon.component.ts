import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-coupon',
  template: `
    <app-seo></app-seo>
    <app-coupon-mobile *ngIf="isMobile"></app-coupon-mobile>
    <app-coupon-desktop *ngIf="isDesktop"></app-coupon-desktop>
  `
})
export class CouponComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

}
