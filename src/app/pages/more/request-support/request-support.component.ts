import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-request-support',
  template: `
    <app-request-support-desktop *ngIf="isDesktop"></app-request-support-desktop>
    <app-request-support-mobile *ngIf="isMobile"></app-request-support-mobile>
  `
})
export class RequestSupportComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

}
