import {Component, ViewChild, ViewEncapsulation, Input, Inject, PLATFORM_ID, HostListener} from '@angular/core';
import {AppBase} from '../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MessageRepo, Security, User} from '../../../common';
import {GlobalState} from '../../../global.state';
import {SignInPopup} from '../../../components/popup';
import {CAPP, EVENT, PRODUCT_TYPE, TOUR_TYPE} from '../../../app.constants';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {isPlatformBrowser} from '@angular/common';

const PAYMENT_STEP: any = [
  {code: 1, step: 'Bước 1', description: 'Thông tin đặt chỗ'},
  {code: 2, step: 'Bước 2', description: 'Thanh toán'},
  {code: 3, step: 'Bước 3', description: 'Hoàn thành'}
];

const LINKS: any[] = [
  {
    url: '/tour/arrival/international',
    label: 'Tour nước ngoài',
    icon: 'icon-international-outline-gray.svg',
    iconActive: 'icon-international-outline.svg'
  },
  {
    url: '/tour/arrival/domestic',
    label: 'Tour trong nước',
    icon: 'icon-domestic-outline-gray.svg',
    iconActive: 'icon-domestic-outline.svg'
  },
  {
    url: '/product/daytour',
    label: 'Tour free & easy',
    icon: 'icon-free-n-easy-outline-gray.svg',
    iconActive: 'icon-free-n-easy-outline.svg',
  },
  {
    url: '/flight',
    label: 'Vé máy bay',
    icon: 'icon-flight-outline-gray.svg',
    iconActive: 'icon-flight-outline.svg'
  },
  {
    url: '/hotel',
    label: 'Khách sạn',
    icon: 'icon-hotel-outline-gray.svg',
    iconActive: 'icon-hotel-outline.svg'
  },
  {
    url: '/product/activities',
    label: 'Vé vui chơi',
    icon: 'icon-activities-outline-gray.svg',
    iconActive: 'icon-activities-outline.svg'
  },
  {
    url: '/more/coupon',
    label: 'Khuyến mãi',
    icon: 'icon-coupon-outline-gray.svg',
    iconActive: 'icon-coupon-outline.svg'
  },
];

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['../header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderDesktopComponent extends AppBase {

  @Input() step?: number = 0;
  @Input() heading: string = '';
  @ViewChild(SignInPopup) signInPopup: SignInPopup;

  params: any = {};
  notificationBadge: number = 0;
  profile: User = new User();

  links: any[] = LINKS;
  selectedMenuItem: IMenuItem = {type: null};
  steps: any = PAYMENT_STEP;

  isLoggedIn: boolean = false;
  isPayment: boolean = false;
  isAuthentication: boolean = true;

  isShowNotification: boolean = false;
  isVMTravel: boolean = false;
  isCollapsed: boolean = true;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _state: GlobalState,
              private _messageRepo: MessageRepo,
              private _security: Security,
              @Inject(PLATFORM_ID) private platformId: Object) {
    super();

    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  @HostListener('window:resize', ['$event'])
  onLoad($event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isCollapsed = true;
    }
  }


  ngOnChanges(): void {

    if (!this.utilityHelper.isNullOrUndefined(this.step) && Number(this.step) > 0) {
      this.isPayment = true;
      this.isAuthentication = false;

      if (this.step > this.steps.length) {
        this.step = this.steps.length;
      }
    }
  }

  ngOnInit() {
    if (!this.utilityHelper.isNullOrUndefined(this.step) && Number(this.step) > 0) {
      this.isPayment = true;
      this.isAuthentication = false;

      if (this.step > this.steps.length) {
        this.step = this.steps.length;
      }
    }

    // detect logged in
    this.isLoggedIn = this._security.isAuthenticated();
    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
    }

    // ure request
    this._state.subscribe(EVENT.USER_REQUESTED, (profile) => {
      this.isLoggedIn = this._security.isAuthenticated();
      this.profile = this._security.getCurrentUser();
      this.getNotificationCheck();
    });

    this._state.subscribe(EVENT.LOGGED_OUT, (isLoggedOut: boolean = false) => {
      if (!this._security.isAuthenticated()) {
        this.isLoggedIn = this._security.isAuthenticated();
        this.profile = null;
        this.isShowNotification = false;

      }
    });

    this._state.subscribe(EVENT.NOTIFICATION_CHANGED, () => {
      this.getNotificationCheck();
    });

    this.getNotificationCheck();

    if (isPlatformBrowser(this.platformId)) {
      this.isVMTravel = this.utilityHelper.isVietmapTravel();
    }
  }

  ngAfterViewInit() {

    this._activatedRoute
      .queryParams
      .subscribe((params) => {
        this.params = params;

        switch (params.type) {
          case 'login': {
            if (!this.isLoggedIn) {
              this.onOpenSignInPopup();
            }
            break;
          }
        }
      });
  }

  // fn get notification check
  getNotificationCheck() {

    return this._messageRepo
      .check()
      .then(
        (res: any) => {

          if (res.data.hasItems) {
            this.notificationBadge = res.data.inboxTotal + res.data.generalTotal;
          }
        }
      );
  }

  // fn on open sign in popup
  onOpenSignInPopup = () => {
    this.signInPopup.show();
    this.isShowNotification = false;
  };

  // fn callback when sign in/up
  onCallback = ($event): void => {

    if (!this.utilityHelper.isNullOrUndefined(this.params.url)) {
      this._router.navigate([this.params.url]);
    }
  };

  //fn on signout
  onSignOut = () => {
    return this._security
      .signOut()
      .then(
        (res: any) => {
          this._state.notifyTo(EVENT.LOGGED_OUT, res);
          this._router.navigate(['/']);
        }
      );
  };

  //fn click outside
  onClickedOutside($event, type: string) {
    switch (type) {
      case 'notification': {
        this.isShowNotification = false;
        break;
      }
      case 'subheader': {
        this.selectedMenuItem = {type: null};
        break;
      }
      default: {
        this.isShowNotification = false;
        break;
      }
    }
  }

  // fn on selecte menu
  onSelectMenu = (item: any): void => {
    if (!!this.selectedMenuItem && this.selectedMenuItem.type === item.type) {
      this.selectedMenuItem = {type: null};
    } else {
      this.selectedMenuItem = item;
    }
  };
}

export interface IMenuItem {
  type: string;
}
