import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-more-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent extends AppBase {

  constructor(private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

}
