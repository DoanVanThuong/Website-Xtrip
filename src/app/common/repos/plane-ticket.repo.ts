import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {PlaneTicket} from '../entities/index';
import {BaseRepo} from './base.repo';

@Injectable()
export class PlaneTicketRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(PlaneTicket, '/', storage, api, httpApi);
  }

  // fn get airports
  getAirportList(keyword: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/airport`, {
          Keyword: keyword
        })
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn result flight
  searchFlight(data: any = Object()) {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/flight/search', data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn booking flight
  bookFlight(data: any = Object()) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/Booking`, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn check flight booking
  checkBookingFlight(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/flight/Booking/${code}`)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );

    });
  }

  // fn get payment list
  /*getListPayment() {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.getListPayment)
        .then(
          (response: any) => resolve(response),
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }*/

  // fn get price summary
  getSummaryPrice(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/priceSummary`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get booking summary price
  getBookingSummaryPrice = (data: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/booking/summary`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get favorite location
  getFavoriteLocation() {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/flight/destination/favourite')
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn add/update point
  pushPoint = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/flight/booking/addons/points', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn add/update coupon
  pushCounpon = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/flight/booking/addons/coupon', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn add/update vat
  pushVAT = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/flight/booking/addons/vat', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  acceptChangePrice = (code: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/booking/priceChanged/confirm/${code}`, null)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };
}