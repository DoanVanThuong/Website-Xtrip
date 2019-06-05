import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {Flight} from '../entities/index';
import {BaseRepo} from './base.repo';

@Injectable()
export class FlightRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Flight, '/', storage, api, httpApi);
  }

  // fn get cheap flight (homepage)
  getCheapFlights = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/homepage/flightCheapFares`, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn result cheap fare
  searchCheapFlights = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/cheapfare`, data)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  };

  //group booking
  groupBooking = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/grouporder`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  //fn verify tour Booking
  verifyBookingFlight(code: string) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/flight/booking/verify/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }
}