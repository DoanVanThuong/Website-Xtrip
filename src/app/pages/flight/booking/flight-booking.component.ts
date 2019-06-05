import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-flight-booking',
  template: `
    <app-flight-booking-desktop *ngIf="isDesktop"></app-flight-booking-desktop>
    <app-flight-booking-mobile *ngIf="isMobile"></app-flight-booking-mobile>
  `,
})
export class FlightBookingComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
  }

}
