import { Component } from '@angular/core';
import { AppBase } from '../../../app.base';
import { DeviceService } from '../../../common/services';

@Component({
  selector: 'app-product-booking',
  template: `
    <app-product-booking-mobile *ngIf="isMobile"></app-product-booking-mobile>
    <app-product-booking-desktop *ngIf="isDesktop"></app-product-booking-desktop>
  `

})
export class ProductBookingComponent extends AppBase {

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
  }
}
