import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Security} from '../../../../common/index';
import {Router} from '@angular/router';
import {AppBase} from '../../../../app.base';
import {GlobalState} from '../../../../global.state';
import {SignInPopup} from '../../../popup';
import {EVENT} from '../../../../app.constants';

@Component({
  selector: 'signin-request-desktop',
  templateUrl: './signin-request-desktop.component.html',
  styleUrls: ['./signin-request-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SigninRequestDesktopComponent extends AppBase {

  @ViewChild(SignInPopup) popup: SignInPopup;
  @Input('show') isShow: boolean = false;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _security: Security) {
    super();
  }

  ngOnInit() {
    this.isShow = !this._security.isAuthenticated();

    this._state.subscribe(EVENT.LOGGED_IN, ($event: any) => {
      this.isShow = !this._security.isAuthenticated();
    });
  }

  //save location when login
  onOpenSignInPopup() {
    this.popup.show();
  }

  onCallback = ($event: any) => {
    this.isShow = !this._security.isAuthenticated();
  };

}