import {Component, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {AppBase} from '../../../../app.base';
import {Security} from '../../../../common/index';
import {User} from '../../../../common/entities';
import {SignOutPopup, PromotionPopup} from '../../../../components/popup';
import {GlobalState} from '../../../../global.state';
import {EVENT} from '../../../../app.constants';

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile.component.mobile.html',
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})

export class ProfileMobileComponent extends AppBase {

  @ViewChild(SignOutPopup) signOutConfirmPopup: SignOutPopup;
  @ViewChild(PromotionPopup) promotionPopup: PromotionPopup;

  profile: User = new User();
  isLoggedIn: boolean = false;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _security: Security) {
    super();
  }

  ngOnInit() {

    if (this._security.isAuthenticated()) {
      this.isLoggedIn = this._security.isAuthenticated();
      this.profile = this._security.getCurrentUser();
    }
  }

  // fn open confirm-back sign out
  openConfirmSignOut = () => {
    this.signOutConfirmPopup.show();
  };

  // fn on sign out
  onSignOut = ($event: any): Promise<any> => {
    return this._security
      .signOut()
      .then(
        (res: any) => {
          this._state.notifyTo(EVENT.LOGGED_OUT, true);
          this._router.navigate(['/']);
        }
      );
  };

  //promotion
  openPromotionPopup() {
    this.promotionPopup.show();
  };

}
