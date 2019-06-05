import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Security} from '../../../common/security';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrls: ['./notification-index.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMobileComponent extends AppPage {

  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  tab: string = 'general';

  params: any = {};

  constructor(private _router: Router,
              private _security: Security,
              private _activateRoute: ActivatedRoute,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this.isLoggedIn = this._security.isAuthenticated();
    this._activateRoute.queryParams.subscribe((params) => {
      this.params = params;
      if (!!params.tab) {
        this.tab = params.tab;
      }
    });
  }

  // fn on select tab
  onSelectTab = ($event: any, tab: string = '') => {
    this.tab = tab;

    this._router.navigate([], {
      queryParams: {
        ...this.params,
        tab: tab
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
  };
}
