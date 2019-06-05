import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {Promotion} from '../entities/index';
import {BaseRepo} from './base.repo';

@Injectable()
export class PromotionRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Promotion, '/', storage, api, httpApi);
  }

  // fn post promotion code
  postPromotionCode(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/account/promotion/${code}`)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  //get link servey
  getLinkServey(data) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/global/tracking/${data}`)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

}