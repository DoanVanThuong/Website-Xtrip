import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import {MessageRepo} from '../../../common/repos';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['../footer.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class FooterMobileComponent extends AppPage {

  routers: Array<any> = [];

  private notificationBadge: number = 0;
  private url: string = '';

  constructor(private _router: Router,
              private _state: GlobalState,
              private _messageRepo: MessageRepo) {
    super();

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;

        if (this.url.indexOf('?') !== -1) {
          this.url = this.url.split('?')[0];
        }
      }
    });
  }

  ngOnInit() {

    this.genRouters();

  }

  // fn gen routers
  genRouters = () => {
    this.routers = [
      {
        title: 'Xtrip',
        url: '/',
        icon: {
          active: 'assets/images/icon/icon-home-green.svg',
          inactive: 'assets/images/icon/icon-home-gray.svg'
        },
        activeExact: true,
      },
      {
        title: 'Đặt chỗ của tôi',
        url: '/my-booking',
        icon: {
          active: 'assets/images/icon/icon-my-booking-green.svg',
          inactive: 'assets/images/icon/icon-my-booking-gray.svg'
        },
        activeExact: false,
      },
      {
        title: 'Mã khuyến mãi',
        url: '/more/coupon',
        icon: {
          active: 'assets/images/icon/icon-coupon-green.svg',
          inactive: 'assets/images/icon/icon-coupon-gray.svg'
        },
        activeExact: false,
      },
      {
        title: 'Tài khoản',
        url: '/account',
        icon: {
          active: 'assets/images/icon/icon-account-green.svg',
          inactive: 'assets/images/icon/icon-account-gray.svg'
        },
        activeExact: true,
      },
      {
        title: 'Xem thêm',
        url: '/more',
        icon: {
          active: 'assets/images/icon/icon-more-green.svg',
          inactive: 'assets/images/icon/icon-more-gray.svg'
        },
        activeExact: true,
      },
    ];
  };

  ngAfterViewInit() {

  }
}
