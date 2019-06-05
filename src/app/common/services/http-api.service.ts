import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Error} from '../entities/error.entity';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';

const API_STORAGE: any = {
  authToken: null,
};

@Injectable()
export class HttpApiService {

  baseUrl: string = '//';
  private _version: string = environment.APP_VERSION;
  private _headers: {} = {};
  
  constructor(protected _http: HttpClient,
              protected _restangular: Restangular) {
  }


  // set base url
  setBaseUrl = (baseUrl: string = '//'): HttpApiService => {
    this.baseUrl = baseUrl;
    return this;
  };

  //fn set version
  setVersion(version: string = environment.APP_VERSION):HttpApiService {
    this._version = version;
    return this;
  }

  getVersion() {
    return this._version;
  }

  setHeaders = (headers: any = {}):HttpApiService =>{
    this._headers  = Object.assign({}, this._headers, headers);
    return this;
  }


  // set resorce to request
  setResource = (resource: string = ''): string => {
    // ned improve
    return `${this.baseUrl}/${resource}`;
  };

  // fn handle success
  private handleSuccess(response: any, resolve) {
    resolve(response.data.data);
  }

  // fn handle error
  private handleError(response: any, reject) {

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

  // fn fetch all list
  all(resource = '', params?: Object) {
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

  // fn get
  get = (resource: string = '', params?: any, headers: any = {}) => {

    return this._http
      .get(this.setResource(resource), {
        params,
        headers
      });
    /*.subscribe(
      (res: any) => res,
      (error: any) => error
    );*/
  };

  // fn post
  post = (resource: string, data?: any, params?: any, headers?: any) => {
    return this._http
      .post(this.setResource(resource), data, {
        params,
        headers: Object.assign({}, this._headers, headers)
      })
  };

  // fn custom post - with query params and body params
  customPOST(resource: string, data?: Object, params?: Object, headers: any = {}) {
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
  put(resource: string, data?: Object) {
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
  patch(resource: string, params?: Object) {
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
