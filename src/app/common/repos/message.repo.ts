import { Injectable } from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import { BaseRepo } from './base.repo';
import {Error, Hotel} from '../entities/index';

@Injectable()
export class MessageRepo extends BaseRepo {

  protected _resource = '/messaging';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Hotel, '/', storage, api, httpApi);
  }

  // fn get general
  getGeneral(offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('messaging/general', null, {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn get general detail
  getGeneralDetail(code: string = '') {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`messaging/general/${code}`)
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // open general
  openGeneral(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .put('messaging/general/' + code)
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn get general
  getInbox(offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('messaging/inbox', null, {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn get inbox detail
  getInboxDetail(code: string = '', offset: number = 0, limit: number = 10) {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`messaging/inbox/${code}`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn rating inbox message
  rateInbox(code: string = '', point: number = 0) {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`messaging/inbox/${code}/${point}`)
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // fn send inbox comment-popup
  sendInboxComment = (code: string = '', data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`messaging/inbox/${code}/comment`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: Error[] = []) => reject(errors)
        );
    });
  };

  // fn get check items
  check() {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`messaging/check`)
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  //fn update badge
  updateBadge() {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`messaging/badge`)
        .then(
          (response: any) => resolve(response),
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

}
