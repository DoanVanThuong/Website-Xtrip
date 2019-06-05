import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {Hotel} from '../entities/index';
import {environment} from '../../../environments/environment';

@Injectable()
export class PaymentRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Hotel, '/', storage, api, httpApi);
  }

  // get List method payment
  getPayments = (module: string = '', code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .setBaseUrl(environment.API_PAY_URL)
        .post(`/method/${module}/${code}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // post payment
  postPayment(module: string, code: string = '', data: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .setBaseUrl(environment.API_PAY_URL)
        .post(`/payment/${module}/${code}`, data)
        .then(
          (response: any) => {
            return this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  // fn get transfer
  getTransferDetail = (module: string = '', code: string = '', data: any = {}) => {

    return new Promise((resolve, reject) => {
      return this._api
        .setBaseUrl(environment.API_PAY_URL)
        .put(`/payment/${module}/${code}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  getTransferData(module: string = '', code: string = '', data: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .setBaseUrl(environment.API_PAY_URL)
        .put(`/payment/${module}/${code}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  //verify booking
  verifyBooking(code: string = '', module: string = '') {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/${module}/booking/verify/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

}
