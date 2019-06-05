import { Injectable } from '@angular/core';

import { ApiService, HttpApiService, StorageService } from './../services/index';
import { BaseRepo } from './base.repo';
import { GlobalConstants } from '../../global.constants';
import { Hotel, Error } from '../entities/index';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HotelRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
    api: ApiService,
    _httpApi: HttpApiService) {
    super(Hotel, '/', storage, api, _httpApi);
    this.setVersion('2.2.5');
  }

  // fn result hotel destination
  getDestinationHotel(keyword: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/hotel/destination/Search', {
          Keyword: keyword
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: Error[] = []) => reject(errors)
        );
    });
  }

  // getFavoriteHotel
  getFavourites() {

    return new Promise((resolve, reject) => {
      this._api
        .get('/hotel/destination/favourite')
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  // searchHotel
  search(data: any = {}, offset: number = 0, limit: number = 10, version?: string) {

    return this._httpApi.post(`hotel/search`, data, {
      offset,
      limit
    }, {
        'App-Version': !!version ? version : this.getVersion()
      });
  };

  // getFilterOperationsHotel
  getFilterOperations(data: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/hotel/filter/options', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  // getInterestPoint
  getInterestPoint(code: number) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetInterestPoints, code)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  // fn get main facilities
  getMainFacilities(hotelCode: string = '', offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .get('/hotel/mainfacilities', {
          hotelCode: hotelCode,
          offset,
          limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get facilities
  getFacilities(hotelCode: string = '') {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/facilities`, {
          hotelCode
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get image category
  getImageCategories(hotelCode: string = '', offset: number = 0, limit: number = 10, allIncluded: boolean = true) {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/imageCategories`, {
          hotelCode,
          offset, limit, allIncluded
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get summary price
  getSummaryPrice(data: any) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.priceSummaryHotel, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // get preferential hotels
  getPreferentialHotels(offset: number = 0, limit: number = 10) {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/hotel/homepage/preferentialHotels', {}, {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn review
  review(data: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.reviewHotel, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get policies
  getPolicies(hotelCode: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/policies`, {
          hotelCode
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get detail
  getBasicDetail(code: string = '', params: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/detail/${code}`, params)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get detail
  getDetail(code: string = '', params: any = {}) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/detail/${code}`, params)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }



  //get search history hotel
  getSearchHistory() {
    return this._httpApi.post(`hotel/history/search`, null, null, {
      'App-Version': '3.0.0'
    });
  }

  //post favorite hotel
  postFavoriteHotel(code: string) {
    return this._httpApi.post(`/hotel/favorite/${code}`);
  }

  //check favorite hotel
  getFavouriteHotel(code: string) {
    return this._httpApi.get(`/hotel/favorite/${code}`);
  }

  //get list favorite hotel
  getHotelsFavorite(offset: number = 0, limit: number = 15) {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/hotel/favorite/list`, {}, {
          offset,
          limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  //get best price hotel
  getBestPriceHotel(code) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`${GlobalConstants.bestPriceHotel}`, {
          hotelCode: code
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn send question
  sendQuestion = (code: string = '', data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/hotel/question/${code}`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  //group booking
  groupBooking = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/hotel/grouporder`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get general review
  getGeneralReview = (code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/generalreview`, {
          hotelCode: code
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get general review
  getMoreReview = (code: string = '', offset: number = 0, limit: number = 10) => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/hotel/moreReviews`, {
          hotelCode: code,
          offset,
          limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get equivalent hotels
  getEquivalentHotels = (data: any = {}, offset: number = 0, limit: number = 10) => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/hotel/equivalentHotels`, data, {
          offset, limit
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  //get list room
  getRooms(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/hotel/rooms', data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get room detail
  getRoomDetail = (selectedValue: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/hotel/room/detail', {
          selectedValue
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn verify hotel Booking
  verifyBookingHotel(code: string) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/hotel/booking/verify/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn add/update point
  pushPoint = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/hotel/booking/addons/points', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // fn add/update coupon
  pushCounpon = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/hotel/booking/addons/coupon', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // fn add/update vat
  pushVAT = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/hotel/booking/addons/vat', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // fn get booking summary price
  getBookingSummaryPrice = (data: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/hotel/booking/summary`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // fn create Request ID
  genRequestID = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/hotel/booking/create`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get detail version 2.2.5
  getDetailVersion2_5(code: string = '', params: any = {}, version?: string) {
    return this._httpApi.post(`hotel/detail/${code}`, params, null, {
      'App-Version': !!version ? version : this.getVersion()
    });
  }

  getFacilitiesVersion2_5(code: string = '', params: any = {}) {
    return this._httpApi.post(`hotel/detail/${code}/facilities`, params, null, {
      'App-Version': this.getVersion()
    });
  }

  //get room group
  getRoomGroup(code: string = '', params: any = {}) {
    return this._httpApi.post(`hotel/detail/${code}/roomList`, params, null, {
      'App-Version': this.getVersion()
    });
  }

  //get price summary version 2.2.5
  getPriceSummary(params: any = {}, version?: string) {
    return this._httpApi.post(`hotel/priceSummary`, params, null, {
      'App-Version': !!version ? version : this.getVersion()
    }).pipe(
      catchError((error) => Observable.throw(error)),
      map((data: any) => {
        return this.handleSuccess(data);
      })
    );
  }

  // fn booking hotel
  bookHotel(params: any, version?: string) {
    return this._httpApi.post('/hotel/booking', params, null, null).pipe(
      catchError((error) => Observable.throw(error)),
      map((data: any) => {
        return data;
      })
    );
  }

  handleSuccess(data: any) {
    if (!!data && data.code === 'Success') {
      return data.data;
    } else {
      return new Error(data.errors[0] || data);
    }
  }
}
