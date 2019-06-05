import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-flight-result',
  template: `
    <app-flight-result-desktop *ngIf="isDesktop"></app-flight-result-desktop>
    <app-flight-result-mobile *ngIf="isMobile"></app-flight-result-mobile>
  `,
})

export class FlightResultComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

}
