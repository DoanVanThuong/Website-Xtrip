import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-hotel-booking',
  template: `
    <app-hotel-booking-mobile *ngIf="isMobile"></app-hotel-booking-mobile>
    <app-hotel-booking-desktop *ngIf="isDesktop"></app-hotel-booking-desktop>
  `
})
export class HotelBookingComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }
}
