import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Security} from '../../../../common/index';
import {Router} from '@angular/router';
import {AppBase} from '../../../../app.base';

@Component({
  selector: 'signin-request-mobile',
  templateUrl: './signin-request-mobile.component.html',
  styleUrls: ['./signin-request-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SigninRequestMobileComponent extends AppBase {

  @Input('show') isShow: boolean = false;

  constructor(private _router: Router,
              private _security: Security) {
    super();
  }

  ngOnInit() {
    this.isShow = !this._security.isAuthenticated();
  }

  //save location when login
  onLogin() {
    this._router.navigate(['/authentication']);
  }

}