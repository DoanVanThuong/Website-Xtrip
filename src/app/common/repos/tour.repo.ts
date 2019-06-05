import {Injectable} from '@angular/core';
import {ApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {GlobalConstants} from '../../global.constants';
import {Tour} from '../entities/index';
import {HttpApiService} from '../services/http-api.service';

@Injectable()
export class TourRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Tour, '/', storage, api, httpApi);
  }


  // fn get popular arrivals
  getTours = (params: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .get('/tour/home', params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // fn get popular tours
  getPopularTours = (type: string, data: any = {code: null}, offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {

      return this._api
        .customPOST(`/tour/home/popular/${type}`, data, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get popular international tour
  getInternationalTours = (data: any = {code: null}, offset: number = 0, limit: number = 10): Promise<any> => {
    return this.getPopularTours('international', data, offset, limit);
  };

  // fn get popular domestic tour
  getDomesticTours = (data: any = {code: null}, offset: number = 0, limit: number = 10): Promise<any> => {
    return this.getPopularTours('domestic', data, offset, limit);
  };

  // fn get cheap tours
  getCheapTours = (offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {

      return this._api
        .customPOST('/tour/home/cheap', null, {offset, limit})
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get cheap tours
  getCheapToursByType = (type: string = '', offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {

      return this._api
        .customPOST(`/tour/home/cheap/${type}`, null, {offset, limit})
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get arrivals
  getArrivals = (params: any = {}) => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/tour/place/arrival', params)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get departure with code
  getDepartures = (code: string = '', params: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/place/departure/${code}`, params)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => {
            reject(errors);
          }
        );
    });
  };

  // getHotelList
  getDestinations(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`tour/departure`, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  //Tour
  // searchTour
  search(data: any, offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/search`, data, {
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

  // get related tour
  getRelatedTour(data: any, offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/tour/search/related', data, {
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

  // fn get filter-popup-popup options
  getFilterOptions = (data: any = {}) => {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/filter/options`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get tour detail
  getDetailTour(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/detail/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get tour detail - http client
  getTourDetail = (code: string = '') => {
    return this._httpApi.get(`/tour/detail/${code}`);
  };

  // fn get tour package
  getTourPackage(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/package/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get tour summary review
  getTourSummaryReview(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/review/${code}/summary`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get route all review
  getTourAllReview(code: string = '', offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/review/${code}`, {
          offset, limit
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
  sendQuestion(code: any, data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/question/${code}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get tour journey
  getTourJourney(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/journey/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get relate tour
  getRelatedTours(code: string = '', data: any = {}, offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/search/related/${code}`, data, {
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

  // fn get availability tour
  getAvailabilityTour(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`${GlobalConstants.tourAvailability}`, data)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get price summary
  getPriceSummary(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/priceSummary`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn reverse tour
  makeReservationTour(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.BookTour, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });

  };

  // fn get tour Arrivals by type
  getTourArrivalBy(type: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/place/arrival/${type}`, {})
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get international arrival
  getTourInternationalArrivals = (): Promise<any> => {
    return this.getTourArrivalBy('international');
  };

  // fn get domestic arrival
  getTourDomesticArrivals = (): Promise<any> => {
    return this.getTourArrivalBy('domestic');
  };

  // fn get tour Arrival
  getTourDeparture(code: string = '') {

    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/place/departure/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });

  };

  // review tour
  review = (data: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/review/results`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //list coupon avaiable
  listCoupon(obj: any, offset, limit) {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`${GlobalConstants.getListAvaiableCoupon}`, obj, {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  //detail coupon
  detailCoupon(code: any) {
    return new Promise((resolve, reject) => {
      let url = `${GlobalConstants.detailCoupon}${code}`;
      return this._api
        .post(url)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  //check coupon
  checkCoupon(data: any) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`${GlobalConstants.checkCoupon}`, data)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  }

  //post favorite tour
  postFavoriteTour(code) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/Favorite/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // get favorite tour
  getFavouriteTour(code) {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/Favorite/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // get list favorite tours
  getFavouriteTours(offset: number = 0, limit: number = 10) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/favorite/list`, {}, {
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

  //get best price tour
  getBestPriceTour(code: string = '') {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/BestPrice/${code}`)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn book group
  bookGroup = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/grouporder`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get available tours
  getAvailableTours = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/available`, data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  //fn verify tour Booking
  verifyBookingTour(code: string) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/booking/verify/${code}`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn add/update point
  pushPoint = (data?: any) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/tour/booking/addons/points', data)
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
        .put('/tour/booking/addons/coupon', data)
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
        .put('/tour/booking/addons/vat', data)
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
        .post(`/tour/booking/summary`, data)
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
        .post(`/tour/booking/create`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fnn get popular destination
  getPopularDestinations = (offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/home/popular/destination`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get popular destination by
  getPopularDestinationsBy = (type: string = null, offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/home/popular/destination/${type}`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get popular international destination
  getPopularInternationalDestinations = (offset: number = 0, limit: number = 10): Promise<any> => {
    return this.getPopularDestinationsBy('international', offset, limit);
  };

  // fn get popular international destination
  getPopularDomesticDestinations = (offset: number = 0, limit: number = 10): Promise<any> => {
    return this.getPopularDestinationsBy('domestic', offset, limit);
  };

  //fn get album
  getAlbum = (offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/album//feature?`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn get detail album
  getDetailAlbum = (code: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/album/detail/${code}`, '')
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn get getFavourite Destinations
  getFavouriteDestinations = (offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/tour/home`)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  //fn get deposit on booking tour page
  getTourDeposit = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/booking/deposit`, data)
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

  //fn get deposit on my booking tour page
  getTourDepositByOrderCode = (code: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/booking/deposit/${code}`)
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

  //confirm deposit by code
  confirmDeposit(data: any = {}) {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/booking/deposit/confirm`, data)
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

  // send tour advice
  sendAdviceTour = (code: string, data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/advice/${code}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // get age group
  getAgegroup = (code: string, data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/agegroup/${code}`, "")
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get data tour tự túc
  getFreeTour = (placeCode: string = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`/tour/journeys${!!placeCode ? `/${placeCode}` : ''}`, null)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get recommend tour in home
  getRecommendTour = (code: string = null): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(!code ? `/tour/recommend` : `/tour/recommend/${code}`, null)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // get recommend tour with
  getRecommendToursWith = (code: string = null, offset: number = 0, limit: number = 0): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/recommend/list/${code}`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get flash deal
  getFlashDealTour = (offset: number = 0, limit: number = 10): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/tour/flashdeal`, null, {
          offset,
          limit
        })
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  }
}
