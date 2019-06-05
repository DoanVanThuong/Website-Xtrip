import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CouponRepo, Coupon} from '../../../../../common/index';
import {AppPage} from '../../../../../app.base';
import {Location} from '@angular/common';
import {TourRepo} from '../../../../../common/repos/tour.repo';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-coupon-detail-mobile',
  templateUrl: './coupon-detail-mobile.component.html',
  styleUrls: ['./coupon-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponDetailMobileComponent extends AppPage {

  constructor(private _router: Router,
              private _activateRoute: ActivatedRoute,
              protected _tourRepo: TourRepo,
              private _couponRepo: CouponRepo,
              private _location: Location) {
    super();
  }

  coupon: Coupon = new Coupon();
  service: any = {
    tour: [],
    flight: [],
    hotel: []
  };

  ngOnInit() {

    this._activateRoute.params.subscribe((param) => {
      if (param.code) {
        this.getCoupon(param.code);
      } else {
        this._location.back();
      }
    });
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onLoadScroll($event) {

    if (window.scrollY > 90) {
      document.querySelector('.coupon-detail-page').classList.add('coupon-scroll');
    } else {
      document.querySelector('.coupon-detail-page').classList.remove('coupon-scroll');
    }
  }

  // fn back to
  backTo = () => {
    this._location.back();
  };

  // fn get coupon detail
  getCoupon = (code: string = ''): any => {

    return this._couponRepo
      .getCouponDetail(code)
      .then(
        (res: any) => {
          this.coupon = new Coupon(res.data);

          this.service = _.groupBy(this.coupon.services, 'module');
        },
        (errors: Array<any>) => {
          this._router.navigate(['/more/coupon']);
        }
      );
  };

  // fn get tour dates
  getTourDates = (tour: any) => {
    switch (tour.type) {
      case 0: {
        return moment(tour.departDate).format('DD/MM');
      }
      case 1: {
        return 'Hằng ngày';
      }
      default: {
        let result = '';
        let max = 2;
        for (let i = 0; i < tour.departDates.length; i++) {
          if (i + 1 > max) {
            result += ' +';
            break;
          }

          result += moment(tour.departDates[i]).format('DD/MM');
          if (i < tour.departDates.length) {
            result += ',';
          }
        }

        return result;
      }
    }
  };

}
