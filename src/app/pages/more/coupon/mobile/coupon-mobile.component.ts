import {Component, ViewEncapsulation} from '@angular/core';

import {CouponRepo, Coupon, Error} from '../../../../common/index';
import {AppPage} from '../../../../app.base';

import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions  } from '@nicky-lenaers/ngx-scroll-to';
import { GlobalState } from '../../../../global.state';
import { EVENT } from '../../../../app.constants';

@Component({
  selector: 'app-coupon-mobile',
  templateUrl: './coupon-mobile.component.html',
  styleUrls: ['./coupon-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponMobileComponent extends AppPage {

  constructor(protected _router: Router,
              protected _scrollToService: ScrollToService,
              protected _couponRepo: CouponRepo,
              private _state: GlobalState,
              private _toastr: ToastrService) {
    super();
  }

  coupons: Array<Coupon> = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.onLoadCoupons();

    this._state
      .subscribe([
        EVENT.LOGGED_IN
      ], (value: boolean = false) => {
        if (value) {
          this.offset = 0;
          this.coupons = [];
          this.onLoadCoupons();
        }
      });

  }

  // infinity scroll
  onScrollDown() {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.onLoadCoupons();
    }
  }

  // fn on load coupons
  onLoadCoupons = (): any => {

    this.isLoading = true;

    return this._couponRepo
      .getCoupons(null, this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;
          this.coupons = this.coupons.concat(res.data.results.map(coupon => new Coupon(coupon)));

          if (!res.data.results.length) {
            this.offset -= this.limit;
          }
        },
        (errors: Array<Error> = []) => {
          this.isLoading = false;
        }
      );

  };

  // fn push notify after copy code
  onClipboardSuccess = (): void => {
    this._toastr.success('Đã copy mã', 'Thông báo');
  };

}