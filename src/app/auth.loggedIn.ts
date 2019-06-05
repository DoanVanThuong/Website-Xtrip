import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';

import {GlobalState} from './global.state';
import {Security} from './common/index';
import {Observable} from 'rxjs';
import {EVENT} from './app.constants';

@Injectable()
export class AuthLoggedIn implements Resolve<any> {

  constructor(protected _state: GlobalState,
              protected _router: Router,
              protected _security: Security) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    if (this._security.isLoggedIn()) {
      return this._security
        .requestCurrentUser()
        .then(
          (res: any) => {

            if (this._security.isAuthenticated()) {

              this._state.notifyDataChanged(EVENT.USER_REQUESTED, res);
              return this._security.getCurrentUser();
            }

            return true;
          }
        );
    }
  }
}
