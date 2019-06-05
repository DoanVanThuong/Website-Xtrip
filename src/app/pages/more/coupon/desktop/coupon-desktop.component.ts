import {Component, ViewEncapsulation} from '@angular/core';
import {CouponMobileComponent} from '../mobile/coupon-mobile.component';
import {Coupon} from '../../../../common';
import * as moment from 'moment';
import {ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-coupon-desktop',
  templateUrl: 'coupon-desktop.component.html',
  styleUrls: ['coupon-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponDesktopComponent extends CouponMobileComponent {

  couponDetail: Coupon = new Coupon();
  service: any = {
    tour: [],
    flight: [],
    hotel: []
  };
  showDetail = false;
  tabs: Array<any> = [{display: 'Điều kiện & điều khoản', value: 'policies'}];
  selectedTab = this.tabs[0];
  selectedCouponItem = '';
  breakPoint: number = 0;
  posArrow: number = 0;

  //on select coupon
  onSelectCoupon = (coupon?: Coupon, index: number = 0): void => {
    this.getCoupon(coupon.code);
    this.selectedCouponItem = coupon.code;

    const row = Math.floor(index / 3);
    this.breakPoint = Number((row + 1) * 3);

    this.posArrow = index % 3;

    setTimeout(() => {
      const config: ScrollToConfigOptions = {
        target: '#' + 'detail',
        offset: -270
      };
      this._scrollToService.scrollTo(config);
    }, 500);

  };

  // fn get coupon detail
  getCoupon = (code: string = ''): any => {
    return this._couponRepo
      .getCouponDetail(code)
      .then(
        (res: any) => {
          this.tabs = [{display: 'Điều kiện & điều khoản', value: 'policies'}];
          this.couponDetail = new Coupon(res.data);
          this.service = _.groupBy(this.couponDetail.services, 'module');

          let tabArray = Object.keys(this.service);
          tabArray.filter(tabArray => {
            tabArray.toLowerCase() === 'tour' ? (this.tabs.push({display: 'Tour giảm giá', value: tabArray})) :
              tabArray.toLowerCase() === 'hotel' ? (this.tabs.push({display: 'Khách sạn giảm giá', value: tabArray})) :
                this.tabs.push({display: 'Vé máy bay', value: tabArray});
          });
          this.selectedTab = this.tabs[0];
          this.showDetail = true;
        },
        (errors: Array<any>) => {
          this._router.navigate(['/more/coupon']);
        }
      );
  };

  //on select tab 
  onSelectTab(tab) {
    this.selectedTab = tab;
  }

  //click out side event
  onClickedCloseDetail(e) {
    this.selectedCouponItem = '';
    this.breakPoint = this.coupons.length;
    this.showDetail = false;
  }

}
