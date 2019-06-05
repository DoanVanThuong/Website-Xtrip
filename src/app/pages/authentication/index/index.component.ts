import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService, Error, Security, Spinner} from '../../../common';
import {
  AuthService as AuthSocialService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';
import {GlobalState} from '../../../global.state';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {EVENT} from '../../../app.constants';

@Component({
  selector: 'authentication-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthSocialService]
})
export class AuthenticationIndexComponent extends AppBase {

  params: any = {};

  constructor(private _router: Router,
              private _state: GlobalState,
              private _authSocial: AuthSocialService,
              private _activatedRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _location: Location,
              private _spinner: Spinner,
              protected _device: DeviceService,
              private _security: Security) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  // fn back
  back = () => {

    if (!!this.params.url) {
      this._router.navigate([this.params.url]);
    } else {
      this._location.back();
    }
  };

  // fn on request profile info
  onRequestProfile() {
    this._security
      .requestCurrentUser()
      .then(
        (res: any) => {
          if (this._security.isAuthenticated()) {
            this._state.notifyTo(EVENT.LOGGED_IN, true);
            this._state.notifyDataChanged(EVENT.USER_REQUESTED, res);

            this._router.navigate(['/account']);
          }
        }
      );
  }

  // fn sign in with facebook
  onSignInWithFacebook() {
    return this._authSocial
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(
        (res: any) => {

          this._spinner.show();
          return this._security
            .signInWithFacebook(res.authToken)
            .then(
              (res: any) => {
                if (this._security.isLoggedIn()) {
                  this.onRequestProfile();
                }

                this._spinner.hide();
              },
              (errors: any) => {
                this._spinner.hide();
                this._toastr.error('Không thể đăng nhập bằng facebook. Vui lòng thử lại sau', 'Lỗi', {
                  positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
                });
              }
            );
        }
      );
  }

  // fn sign in with google
  onSignInWithGoogle() {

    return this._authSocial
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(
        (res: any) => {

          this._spinner.show();

          return this._security
            .signInWithGoogle(res.idToken)
            .then(
              (res: any) => {
                if (this._security.isLoggedIn()) {
                  this.onRequestProfile();
                }

                this._spinner.hide();
              },
              (errors: Error[] = []) => {

                this._spinner.hide();

                this._toastr.error('Không thể đăng nhập bằng google. Vui lòng thử lại sau.', 'Lỗi', {
                  positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
                });
              }
            );
        }
      );
  }
}
