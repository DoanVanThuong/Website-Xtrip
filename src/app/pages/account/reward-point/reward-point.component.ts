import {Component} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/index';

@Component({
  selector: 'app-profile-point',
  template: `
    <app-reward-point-mobile *ngIf="isMobile"></app-reward-point-mobile>
    <app-reward-point-desktop *ngIf="isDesktop"></app-reward-point-desktop>
  `,
})
export class ProfileMyPointComponent extends AppPage {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }
}
