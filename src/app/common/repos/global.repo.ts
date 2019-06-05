import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {BaseRepo} from './base.repo';
import {GlobalConstants} from '../../global.constants';

@Injectable()
export class GlobalRepo extends BaseRepo {

  protected _resource = '/global';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Object, '/global', storage, api, httpApi);
  }

  // fn send feedback by rating
  rating = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.sendfeedback, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get banners
  getBanners = (params: any = {}) => {

    return new Promise((resolve, reject) => {

      this._api
        .get('/global/banner/home', params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );

    });
  };

  // fn get countries
  getCountries = (params: any = {}) => {
    return new Promise((resolve, reject) => {

      this._api
        .get('/global/countries', params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );

    });
  };

  // fn get support tickets
  getSupportTickets = () => {
    return new Promise((resolve, reject) => {
      this._api
        .post('/global/support/types')
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn post support ticket
  postSupportTicket = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      this._api
        .post('/global/support/ticket', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn post support ticket from my booking
  postSupportTicketMyBooking = (moduletype: string = '', code: string = '', data: any = {}) => {
    return new Promise((resolve, reject) => {
      this._api
        .post(`/booking/${moduletype}/${code}/support/ticket`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn update device
  updateDevice = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      this._api
        .put('/global/Setting/Device', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn subscribe email to newsletter
  subscribeNewsletter = (email: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      this._api
        .post(`global/subscribe/newsletter/${email}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get FAQ
  getFAQ = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this._api
        .get(`global/faqs`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }
}
