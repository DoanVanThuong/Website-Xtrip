import {Injectable} from '@angular/core';

import {ApiService, HttpApiService, StorageService} from './../services/index';
import {BaseRepo} from './base.repo';
import {GlobalConstants} from '../../global.constants';
import {Room} from '../entities/index';

@Injectable()
export class RoomRepo extends BaseRepo {

  protected _resource = '/';

  constructor(storage: StorageService,
              api: ApiService,
              httpApi: HttpApiService) {
    super(Room, '/', storage, api, httpApi);
  }

  getInterestPoint(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetInterestPoints + code)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getMainFacilities(code: any) {
    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetMainFacilities + code)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getAllFacilities(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetAllFacilities + code)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getListCategoryHotel(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetListCategory + code)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getDetailCategoryBy(hotelCode: any, categoryCode: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetDetailCategory, {
          hotelCode: hotelCode,
          categoryCode: categoryCode
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getMainReviews(code: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetMainReviews + code)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getReview(code: any, pi: any, ps: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetCmt, {
          hotelCode: code,
          offset: pi,
          limit: ps
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  // fn get policies
  getPolicies(code) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetPolicies, {
          hotelCode: code
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  // send question
  sendQuestion(code: any, data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(GlobalConstants.sendQuestion, data, {
          hotelCode: code
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getEquivalentHotels(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.equivalentHotels, data)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getRooms(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.rooms, data)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getPriceSummaryHotel(data: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .post(GlobalConstants.priceSummaryHotel, data)
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }

  getHotelDetailByCode(code: any, checkin: any, night: any, room: any, adult: any) {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.GetHotelDetailByCode, {
          hotelCode: code,
          checkIn: checkin,
          nights: night,
          rooms: room,
          adults: adult,
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  }


}
