import { Component, ViewEncapsulation } from '@angular/core';
import { AppBase } from 'app/app.base';

@Component({
  selector: 'app-hotel-banner-desktop',
  templateUrl: './hotel-banner-desktop.component.html',
  styleUrls: ['./hotel-banner-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelBannerDesktopComponent extends AppBase {

  constructor() {
    super()
  }

}
