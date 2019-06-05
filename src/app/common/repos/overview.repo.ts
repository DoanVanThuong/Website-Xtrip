import {Injectable} from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';

@Injectable()
export class OverviewRepo extends BaseRepo {

  protected _resource = '/home';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(null, '/', storage, api, httpApi);
  }

  // fn get banner
  getBanners(params: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .get('/global/banner/home', params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }
}
