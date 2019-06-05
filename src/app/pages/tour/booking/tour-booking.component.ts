import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-tour-booking',
  template: `
    <app-tour-booking-mobile *ngIf="isMobile"></app-tour-booking-mobile>
    <app-tour-booking-desktop *ngIf="isDesktop"></app-tour-booking-desktop>
  `
})

export class TourBookingComponent extends AppPage {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
