import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {Country} from '../entities/index';
import {BaseRepo} from './base.repo';
import {GlobalConstants} from '../../global.constants';

@Injectable()
export class CountryRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Country, '/', storage, api, httpApi);
  }

  all = (params: any = {}): Promise<any> => {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.getcountries, params)
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

}