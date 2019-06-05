import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-tour-recommend',
  template: `
    <app-tour-recommend-desktop *ngIf="isDesktop"></app-tour-recommend-desktop>
    <app-tour-recommend-mobile *ngIf="isMobile"></app-tour-recommend-mobile>
  `,
  styleUrls: ['./tour-recommend.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class TourRecommendComponent extends AppPage {

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
