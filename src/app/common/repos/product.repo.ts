import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {BaseRepo} from './base.repo';
import {Product} from '../entities';

@Injectable()
export class ProductRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Product, '/', storage, api, httpApi);
  }

  // fn get types
  getTypes = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/types', null)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn post product result
  searchProduct(data: any = {}, offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/product/search', data, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn post product result
  relatedProduct(data: any = {}, offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/product/related', data, {

          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //filter-popup product
  filterProduct(data: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/filter', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get hot deal
  getHotDeal = (data: string = '', offset: number = 0, limit: number = 10) => {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`product/hotdeal/${data}`, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // get your activities
  getYourSuggestions = (type: string = '', offset: number = 0, limit: number = 0) => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/product/youractivities/${type}`, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get favourite destination by type
  getFavouriteDestinationsBy = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/destination/favourite', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get favourite destinations
  getFavouriteDestinations = (offset: number = 0, limit: number = 0) => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/product/destination/favourite', null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get popular destinations
  getPopularDestinations = (type: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/product/destination/popular/${type}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn search destination
  searchDestinations = (keyword: string = '', type: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/destination/search', {
          keyword, type
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //get detail product
  getDetail = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api.post(`/product/detail/${id}`, {})
        .then(
          (res: any) => this.success(res, resolve, reject),
          (errors: any) => reject(errors)
        )
        ;
    });
  };

  //fn ge combo option
  getOption(id: string, date?: string) {
    if (!!date) {
      return this._api.customPOST(`/product/options/${id}/${date}`, '');
    }
    else
      return this._api.customPOST(`/product/options/${id}`, '');
  }

  // fn create booking (requestId)
  generateRequestID(body: any) {
    return new Promise((resolve, reject) => {
      return this._api.post(`/product/booking/create`, body)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  //fn update passenger
  updatePassengerNumbers(body: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/product/booking/addons/passenger/numbers', body)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn get price
  getPriceSummary(body: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/booking/summary', body)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get passengers
  getPassengers = (params: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/product/booking/addons/passenger', params)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn update time slot
  updateTimeSlot(body: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/product/booking/addons/timeslot', body)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  //fn update option perBooking by uuid
  updateOptionPerBooking = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/perbooking`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn update option perBooking by uuid
  updateOptionPerBookingByOne = (uuid: string = '', body: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/perBooking/${uuid}`, body)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn make reservation code
  makeReservation = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/product/booking/confirm`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn check booking code
  checkBookingCode = (code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/product/booking/${code}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn apply coupon
  applyCoupon = (data: { requestId, couponCode } = {requestId: '', couponCode: ''}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/coupon`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn apply point
  applyPoint = (data: { requestId, points } = {requestId: '', points: 0}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/points`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn apply vat
  applyVAT = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/vat`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn update passengers
  updatePassengers = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`/product/booking/addons/passenger`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn upload passenger image
  uploadPassengerFile = (uuid: string = '', data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {

      const fd = new FormData();
      for (let key in data) {
        fd.append(key, data[key]);
      }

      return this._api
        .putFormData(`/product/booking/addons/passenger/${uuid}`, fd)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn reset session
  resetSession = (requestId: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .delete(`/product/booking/addons/${requestId}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn reset session
  getDatesAvailable = (productId: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/product/options/${productId}/available`, '')
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };
}
