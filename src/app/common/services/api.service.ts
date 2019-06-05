import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Error} from '../entities/error.entity';

const API_STORAGE: any = {
  authToken: null,
};

@Injectable()
export class ApiService {

  constructor(protected _restangular: Restangular) {
  }

  // fn handle success
  private handleSuccess(response: any, resolve) {
    resolve(response.data.data);
  }

  // fn handle error
  private handleError(response: any, reject: any) {

    let errors = [];
    let data: {
      errors: any
    } = response.data;

    if (_.isObject(data) && _.isArray(data.errors)) {
      data.errors.forEach(function (error) {
        errors.push(new Error(error));
      });
    } else {
      errors.push(new Error({
        errorMessage: response.statusText,
      }));
    }

    reject(errors);
  }

  // fn set base url
  setBaseUrl = (url: string = '') => {
    this._restangular.provider.setBaseUrl(url);

    return this;
  };

  // fn fetch all list
  all = (resource: string = '', params: any = {}) => {
    return new Promise((resolve, reject) => {

      let request = this._restangular.all(resource);

      if (typeof params === 'undefined') {
        request.getList()
          .subscribe(
            (response: any) => this.handleSuccess(response, resolve),
            (response: any) => this.handleError(response, reject)
          );
      } else {
        request.getList(Object.assign({}, params))
          .subscribe(
            (response: any) => this.handleSuccess(response, resolve),
            (response: any) => this.handleError(response, reject)
          );
      }
    });
  }

  // fn fetch single
  get(resource, params?: Object) {
    return new Promise((resolve, reject) => {
      this._restangular
        .all(resource)
        .customGET('', params)
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  // fn post
  post(resource: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this._restangular
        .one(resource)
        .post('', params)
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  // fn custom post - with query params and body params
  customPOST(resource: string, data: any = {}, params: any = {}, headers: any = {}) {
    return new Promise((resolve, reject) => {
      this._restangular
        .all(resource)
        .customPOST(data, null, params, headers)
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject)
        );
    });
  }

  // fn post form data
  postFormData(resource: string, formData: FormData, headers: any = {}) {
    return new Promise((resolve, reject) => {
      this._restangular
        .all(resource)
        .customPOST(formData, undefined, undefined, Object.assign({'Content-Type': undefined}, headers))
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  // fn put
  put(resource: string, data: any = {}) {
    return new Promise((resolve, reject) => {
      return this._restangular.one(resource)
        .customPUT(data, '')
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  putFormData(resource: string, formData: FormData, headers: any = {}) {
    return new Promise((resolve, reject) => {
      this._restangular
        .all(resource)
        .customPUT(formData, undefined, undefined, Object.assign({'Content-Type': undefined}, headers))
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  // fn patch
  patch(resource: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this._restangular.one(resource)
        .patch(params)
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }

  // fn delete
  delete(resource: string, params?: any) {
    return new Promise((resolve, reject) => {
      this._restangular.one(resource)
        .remove(Object.assign({}, params))
        .subscribe(
          (response) => this.handleSuccess(response, resolve),
          (response) => this.handleError(response, reject));
    });
  }
}
