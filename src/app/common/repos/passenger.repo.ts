import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {BaseRepo} from './base.repo';
import {Passenger} from '../entities/passenger.entity';

@Injectable()
export class PassengerRepo extends BaseRepo {

  protected _resource = '/';


  constructor(api: ApiService,
              storage: StorageService,
              httpApi: HttpApiService) {
    super(Passenger, '/', storage, api, httpApi);
  }

  // fn get passengers
  fetchAll = (params: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`account/passenger`, params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn create new passenger
  create = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`account/passenger`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn update new passenger
  update = (id: string = '', data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`account/passenger/${id}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn delete passenger
  delete = (code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .delete(`account/passenger/${code}`, {})
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };
}
