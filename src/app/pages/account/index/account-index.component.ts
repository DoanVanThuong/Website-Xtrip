import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Router} from '@angular/router';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AccountIndexComponent extends AppPage {

  constructor(private _router: Router,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit(): void {

    if (this.isDesktop) {
      this._router.navigate(['/account/information']);
    }
  };

  ngAfterViewInit(): void {

  }
}
