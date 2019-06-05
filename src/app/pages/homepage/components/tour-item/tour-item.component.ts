import {Component, Input,   ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {Router} from '@angular/router';
import {Tour, TourSearch} from '../../../../common/entities';
import {DeviceService} from '../../../../common/services';
import {GlobalState} from '../../../../global.state';

@Component({
  selector: 'home-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['tour-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeTourItemComponent extends AppPage {

  @Input() tour: Tour = new Tour();
  @Input() version: number = 1;

  tourSearch: TourSearch = new TourSearch();

  constructor(private _router: Router,
              private _state: GlobalState,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  // fn gen params
  generateTourParams = (tour: Tour): any => {
    return this.utilityHelper.buildQueryParams();
  };
}
