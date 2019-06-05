import {ApiService, StorageService} from '../services/index';
import {UtilityHelper} from '../helpers';
import {HttpApiService} from '../services/http-api.service';
import {environment} from '../../../environments/environment';

export abstract class BaseRepo {

  private _version: string = environment.APP_VERSION;
  utilityHelper: UtilityHelper = new UtilityHelper();

  constructor(protected _model: any,
              protected _resource: string,
              protected _storage: StorageService,
              protected _api: ApiService,
              protected _httpApi: HttpApiService) {
    try {
      new this._model();
    } catch (e) {
      console.error('Model of ' + this.constructor.name + ' does not exist.');
    }
    if (!this._resource) {
      console.error('Resource of ' + this.constructor.name + ' does not exist');
    }

    this._httpApi.setBaseUrl(environment.API_URL);
  }

  /***
   * Get Api
   *
   * @returns {ApiService}
   */
  api() {
    return this._api;
  }

  // fn set verion
  setVersion = (version:string = environment.APP_VERSION):BaseRepo => {
    this._version = version;
    return this;
  }

  // fn get version
  getVersion = () =>{
    return this._version;
  }

  // request successfully
  success(response: any = {}, resolve: any = Function, reject: any = Function) {
    if (!!response.code && response.code.toLowerCase() === 'success') {
      if (typeof resolve === 'function') {
        return resolve(response);
      }
      return response;
    } else {
      if (typeof reject === 'function') {
        return reject(response.errors);
      }
      return response.errors;
    }
  }

  // fn fetch with params
  all = (params: any = {}): Promise<any> => {

    return new Promise((resolve, reject) => {

      return this._api
        .all(this._resource, params)
        .then(
          (response: any) => {
            resolve(response.data.map(item => new this._model(item)));
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn single
  find(model: any) {

    let id = this.findID(model);

    return new Promise((resolve, reject) => {
      return this._api
        .get(this._resource + '/' + id)
        .then(
          response => resolve(new this._model(response)),
          errors => reject(errors)
        );
    });
  }

  // fn create new object
  create = (data: any = Object): Promise<any> => {

    return new Promise((resolve, reject) =>
      this._api.post(this._resource, data).then(
        response => resolve(new this._model(response)),
        errors => reject(errors)
      )
    );
  };


  // fn update object
  update = (model: any, data: any = Object): Promise<any> => {

    let id = this.findID(model);

    return new Promise((resolve, reject) => {

      this._api
        .put(this._resource + '/' + id, data)
        .then(
          response => resolve(new this._model(response)),
          errors => reject(errors)
        );
    });
  };

  /**
   * Destroy a resource
   *
   * @param model
   * @param {boolean} loading
   * @returns {Promise<any>}
   */
  destroy = (model: any): Promise<any> => {

    let id = this.findID(model);

    return new Promise((resolve, reject) =>
      this._api
        .delete(this._resource + '/' + id)
        .then(
          response => resolve(response),
          errors => reject(errors)
        )
    );
  };

  // fn find id
  private findID(model: any) {
    let id;
    if (model instanceof Object) {
      id = model.id;
    } else {
      id = model;
    }

    return id;
  }

  /**
   * Find a resource by an array of attributes
   *
   * @param {Object} $attributes
   */
  findByAttributes($attributes: Object) {

  }

  /**
   * Return a array of elements who's ids match
   *
   * @param {Object} $ids
   */
  findByMany($ids: Object) {

  }

  /**
   * Delete a resource by an array of attributes
   *
   * @param {Object} $attributes
   */
  destroyByAttributes($attributes: Object) {

  }
}
