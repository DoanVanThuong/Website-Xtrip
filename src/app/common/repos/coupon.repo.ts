import {Injectable} from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {Coupon} from '../entities/index';

@Injectable()
export class CouponRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Coupon, '/', storage, api, httpApi);
  }

  // fn get coupon with
  getCoupons = (data: any = {}, offset: number = 0, limit: number = 10) => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/coupon/available`, data, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get tour coupon
  getTourCoupons = (code: string = '', requestId: string = '', offset: number = 0, limit: number = 10) => {
    return this.getCoupons({
      code,
      requestId,
      module: 'tour'
    }, offset, limit);
  };

  // fn get flight coupon
  getFlightCoupons = (code: string = '', requestId: string = '', offset: number = 0, limit: number = 10) => {
    return this.getCoupons({
      code,
      requestId,
      module: 'flight'
    }, offset, limit);
  };

  // fn get hotel coupon
  getHotelCoupons = (code: string = '', requestId: string = '', offset: number = 0, limit: number = 10) => {
    return this.getCoupons({
      code,
      requestId,
      module: 'hotel'
    }, offset, limit);
  };

  // fn find coupon detail
  getCouponDetail = (code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/coupon/${code}`, null)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn check coupon with
  checkCoupon = (couponCode: string = '', requestId: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/coupon/available/check`, {
          couponCode,
          requestId
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

}
