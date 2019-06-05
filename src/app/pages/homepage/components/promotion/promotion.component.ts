import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService} from '../../../../common/services/index';
import {Router} from '@angular/router';

@Component({
  selector: 'home-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomePromotionComponent extends AppPage {

  @Input() class: string = '';

  constructor(private _router: Router,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {
    this.getTours();
  }

  // fn get tours
  getTours() {
  }
}
