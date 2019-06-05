import {Component, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {DeviceService} from '../../../../common/services/index';
import {Tour, TourRepo} from '../../../../common';
import {AppPage} from '../../../../app.base';
import {GlobalState} from '../../../../global.state';
import {EVENT} from '../../../../app.constants';

@Component({
  selector: 'home-all-in-one-tour',
  templateUrl: './all-in-all-tour.component.html',
  styleUrls: ['./all-in-all-tour.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeAllInOneTourComponent extends AppPage {

  constructor(private _state: GlobalState,
              protected _device: DeviceService,
              private _tourRepo: TourRepo,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {

  }
}
