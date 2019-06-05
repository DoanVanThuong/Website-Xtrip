import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {DeviceService, Security, User} from '../../../common';
import {Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import {ToastrService} from 'ngx-toastr';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'app-homepage-mobile',
  templateUrl: './homepage-mobile.component.html',
})

export class HomepageMobileComponent extends AppBase {

  profile: User = null;

  constructor(private _toastr: ToastrService,
              private _state: GlobalState,
              private _router: Router,
              private _security: Security,
              private _device: DeviceService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();

    this.setDeviceMode(_device);
  }
}
