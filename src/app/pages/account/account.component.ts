import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../app.base';
import {DeviceService} from '../../common/services';

@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends AppPage {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }
}
