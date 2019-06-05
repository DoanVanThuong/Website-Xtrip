import {Injectable} from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {Blog, Error} from '../entities/index';

@Injectable()
export class BlogRepo extends BaseRepo {

  protected _resource = '/blog';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Blog, '/', storage, api, httpApi);
  }

  // fn get blogs
  getBlogs(offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/blog/list', null, {
          offset,
          limit
        })
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn get blog detail
  getBlogDetail(code: string = '', alias: string = '', params: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/blog/detail/${code}/${alias}`, params)
        .then(
          (response: any) => this.success(response, resolve, reject)
        );
    });
  }

}
