import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {GlobalState} from './global.state';
import {DeviceService, Security} from './common/index';
import {Observable} from 'rxjs';

@Injectable()
export class AuthRequest implements Resolve<any> {

  constructor(protected _state: GlobalState,
              protected _router: Router,
              protected _security: Security,
              protected _device: DeviceService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    if (this._security.isLoggedIn()) {
      return this._security.requestCurrentUser();
    } else {
      if (this._device.isDesktop()) {

        this._router.navigate(['/'], {
          queryParams: {
            type: 'login'
          }
        });

      } else {
        this._router.navigate(['/authentication']);
      }
    }
  }
}
