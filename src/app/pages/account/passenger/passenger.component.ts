import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-account-passenger',
  template: `
    <app-account-passenger-mobile *ngIf="isMobile"></app-account-passenger-mobile>
    <app-account-passenger-desktop *ngIf="isDesktop"></app-account-passenger-desktop>
  `,

})
export class PassengerComponent extends AppPage {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }
}
