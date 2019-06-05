import {Component, OnInit} from '@angular/core';
import {AppBase} from '../../app.base';
import {Security} from '../../common/security';
import {Location} from '@angular/common';

@Component({
  selector: 'app-authentication',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AuthenticationComponent extends AppBase {

  constructor(private _security: Security,
              private _location: Location) {
    super();
  }

  ngOnInit() {

    if (this._security.isAuthenticated()) {
      this._location.back();
    }
  }

}
