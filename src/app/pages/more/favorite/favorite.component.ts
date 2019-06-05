import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-favorite-component',
  template: `
    <app-favorite-desktop *ngIf="isDesktop"></app-favorite-desktop>
    <app-favorite-mobile *ngIf="isMobile"></app-favorite-mobile>
  `
})
export class FavoriteComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();
    this.setDeviceMode(_device);
  }
}
