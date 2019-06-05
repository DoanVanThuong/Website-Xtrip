import {Injectable} from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {GlobalConstants} from '../../global.constants';
import {Tour} from '../entities/index';
import {environment} from '../../../environments/environment';

@Injectable()
export class BookingRepo extends BaseRepo {

  private baseUrl = environment.API_PAY_URL;

  protected _resource = '/booking';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Tour, '/booking', storage, api, httpApi);
  }

  // get Booking list
  getBooking = (module: string = '', offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/booking/${module}/mybooking/list`, '', {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get booked flight list
  getBookedFlights = (offset: number = 0, limit: number = 10) => {
    return this.getBooking('flight', offset, limit);
  };

  // fn get booked tours list
  getBookedTours = (offset: number = 0, limit: number = 10) => {
    return this.getBooking('tour', offset, limit);
  };

  // fn get booked hotels list
  getBookedHotels = (offset: number = 0, limit: number = 10) => {
    return this.getBooking('hotel', offset, limit);
  };

  // fn get booked product list
  getBookedProducts = (offset: number = 0, limit: number = 10) => {
    return this.getBooking('product', offset, limit);
  };

  // fn check sync with account
  checkSync = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/booking/sync`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn sync my booking to account
  sync = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/booking/sync`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn keep sync
  skipSync = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/booking/sync`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //get booked detail
  getBookedDetail = (module: string = '', code: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/booking/${module}/mybooking/detail/${code}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get flight detail
  getBookedFlightDetail = (code: string = '') => {
    return this.getBookedDetail('flight', code);
  };

  // fn get hotel detail
  getBookedHotelDetail = (code: string = '') => {
    return this.getBookedDetail('hotel', code);
  };

  // fn get tour detail
  getBookedTourDetail = (code: string = '') => {
    return this.getBookedDetail('tour', code);
  };

  // fn get product detail
  getBookedProductDetail = (code: string = '') => {
    return this.getBookedDetail('product', code);
  };

  //get Payment info
  getPaymentInfo = (module: string = '', code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .setBaseUrl(this.baseUrl)
        .post(`/info/${module}/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn send ticket
  sendTicket = (module: string = '', data: any = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/booking/${module}/mybooking/sendbooking`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn send flight ticket
  sendFlightTicket = (data: any = null): Promise<any> => {
    return this.sendTicket('flight', data);
  };

}
