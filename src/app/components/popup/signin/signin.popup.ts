import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Error, Security, StorageService, User} from '../../../common/index';
import {PopupBase} from '../popup.base';
import {GlobalState} from '../../../global.state';
import {ToastrService} from 'ngx-toastr';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';
import {EVENT} from '../../../app.constants';

@Component({
  selector: 'sign-in-popup',
  templateUrl: './signin.popup.html',
  styleUrls: ['./signin.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class SignInPopup extends PopupBase {

  @Output('callback') callback: EventEmitter<any> = new EventEmitter<any>();

  isSignIn: boolean = true;
  isForgotShow: boolean = false;
  isLoggedIn: boolean = false;

  profile: User = new User();

  constructor(private _router: Router,
              private _authSocial: AuthService,
              private _state: GlobalState,
              private _toaster: ToastrService,
              private _storage: StorageService,
              private _security: Security) {
    super();
  }

  // on initial
  ngOnInit() {

    this._state.subscribe(EVENT.LOGGED_IN, () => {
      if (this._security.isAuthenticated()) {
        this.profile = this._security.getCurrentUser();
        this.isLoggedIn = this._security.isAuthenticated();
      }
    });
  }

  ngOnChanges() {

  }

  // fn init
  onInit = (): any => {
    this.isLoggedIn = this._security.isAuthenticated();

    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
    }

    return this;
  };

  // fn on request profile info
  onRequestProfile() {
    this._security
      .requestCurrentUser()
      .then(
        (res: any) => {
          if (this._security.isAuthenticated()) {
            this._state.notifyTo(EVENT.LOGGED_IN, true);
            this._state.notifyTo(EVENT.USER_REQUESTED, res);
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
          return this._security
            .signInWithFacebook(res.authToken)
            .then(
              (res: any) => {
                if (this._security.isLoggedIn()) {
                  this.onRequestProfile();
                }

                this.onCallback();
              },
              (errors: Error[] = []) => {
                this._toaster.error('Không thể đăng nhập bằng facebook. Vui lòng kiểm tra lại sau', 'Lỗi', {
                  positionClass: 'toast-top-right'
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

          return this._security
            .signInWithGoogle(res.idToken)
            .then(
              (res: any) => {
                if (this._security.isLoggedIn()) {
                  this.onRequestProfile();
                }

                this.onCallback();
              },
              (errors: any) => {
                this._toaster.error('Không thể đăng nhập bằng google. Vui lòng kiểm tra lại sau', 'Lỗi', {
                  positionClass: 'toast-top-right'
                });
              }
            );
        }
      );
  }

  // fn sign out
  onSignOut = () => {

    return this._security
      .signOut()
      .then(
        (res: any) => {
          this._state.notifyTo(EVENT.LOGGED_OUT, true);
          this.onCallback();
        }
      );
  };

  // callback
  onCallback = () => {
    this.hide();
    this.callback.emit();
  };

}
