import { Component } from '@angular/core';
import { AppBase } from '../../../app.base';
import { DeviceService } from '../../../common/services';

@Component({
  selector: 'app-product-free-n-easy',
  template: `
    
    <!-- for mkt -->
    <h1 class="invisible h-none m-none">du lịch tự túc</h1>
    
    
    <app-product-free-n-easy-mobile *ngIf="isMobile"></app-product-free-n-easy-mobile>
    <app-product-free-n-easy-desktop *ngIf="isDesktop"></app-product-free-n-easy-desktop>
    
  `
})
export class ProductFreeAndEasyComponent extends AppBase {

  constructor(private _device: DeviceService) {
    super();
    this.setDeviceMode(_device);
  }
}
