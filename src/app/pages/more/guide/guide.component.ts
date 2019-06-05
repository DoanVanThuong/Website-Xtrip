import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'more-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class GuideComponent extends AppPage {

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}