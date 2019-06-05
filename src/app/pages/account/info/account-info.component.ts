import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-account-info',
  template: `
    <app-account-info-desktop *ngIf="isDesktop"></app-account-info-desktop>
    <app-account-info-mobile *ngIf="isMobile"></app-account-info-mobile>
  `
})
export class AccountInfoComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
