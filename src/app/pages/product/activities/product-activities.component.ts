import { Component } from '@angular/core';
import { AppBase } from '../../../app.base';
import { DeviceService } from '../../../common/services';

@Component({
  selector: 'app-product-free-n-easy',
  template: `

    <!-- for mkt -->
    <h1 class="invisible h-none m-none">Vé vui chơi</h1>
    
    <app-product-activities-mobile *ngIf="isMobile"></app-product-activities-mobile>
    <app-product-activities-desktop *ngIf="isDesktop"></app-product-activities-desktop>
  `
})
export class ProductActivitiesComponent extends AppBase {

  constructor(private _device: DeviceService) {
    super();
    this.setDeviceMode(_device);
  }
}
