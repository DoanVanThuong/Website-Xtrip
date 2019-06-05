import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-my-booking',
  template: `
    <my-booking-index-mobile *ngIf="isMobile"></my-booking-index-mobile>
    <my-booking-index-desktop *ngIf="isDesktop"></my-booking-index-desktop>
  `
})
export class MyBookingIndexComponent extends AppPage {


  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
