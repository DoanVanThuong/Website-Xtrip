import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'app-hotel-loading',
  templateUrl: './hotel-loading.component.html',
  styleUrls: ['./hotel-loading.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class HotelLoadingComponent extends AppBase {

  constructor() {
    super();
  }

}
  