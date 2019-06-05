import {Injectable} from '@angular/core';
import {ApiService, HttpApiService, StorageService} from '../services';
import {GlobalConstants} from '../../global.constants';
import {BaseRepo} from './base.repo';
import {User} from '../entities';

@Injectable()
export class AuthRepo extends BaseRepo {

  protected _resource = '/';

  constructor(api: ApiService, storage: StorageService, httpApi: HttpApiService) {
    super(User, '/', storage, api, httpApi);
  }

  // fn authenticate
  signIn = (username: string = '', password: string = '') => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/login/local', {
          username,
          password
        })
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });

  };

  // fn sign with facebook account
  signInFB = (access_token: string = '') => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/login/external', {
          token: access_token,
          type: 'facebook'
        })
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

  // sign in with google account
  signInGG = (access_token: string = '') => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/login/external', {
          token: access_token,
          type: 'google'
        })
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn refresh token
  refreshToken = (refresh_token: string = '') => {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST('/account/login/refresh', {
          token: refresh_token
        }, null, {
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn sign up account
  signUp = (data: any = {}) => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('account/register', {
          email: data.email,
          phoneNumber: data.phone,
          password: data.password
        })
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn sign out
  signOut = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('account/logout')
        .then(
          (res: any) => resolve(res),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get authentication
  auth = () => {

    return new Promise((resolve, reject) => {
      return this._api
        .get(GlobalConstants.getUserProfile)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn request forgot password
  forgot = (data: any = {}) => {

    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/password/forget', {
          Email: data.email
        })
        .then(
          (response: any) => {
            if (response.status) {
              resolve(response);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn reset password
  reset = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/password/reset', data)
        .then(
          (response: any) => {
            if (response.status) {
              resolve(response);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn update profile
  updateProfile = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put('/account/profile', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn change password
  changePassword = (data: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      return this._api
        .post('/account/password/change', data)
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get reward point history
  getRewardPoints = (offset: number = 0, limit: number = 10) => {

    return new Promise((resolve, reject) => {
      return this._api
        .customPOST(`/account/history/rewardpoints`, {}, {
          offset: offset,
          limit: limit
        })
        .then(
          (response: any) => resolve(response.data),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn check email
  checkEmail = (email: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`account/Check/Email/${email}`, {})
        .then(
          (response: any) => {
            if (response.status) {
              resolve(response);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn check email
  checkPhone = (phone: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`/account/Check/Phone/${phone}`, {})
        .then(
          (response: any) => {
            if (response.status) {
              resolve(response);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn check expired token
  checkExpiredToken = (token: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`account/password/check/reset`, {
          ResetId: token
        })
        .then(
          (response: any) => {
            this.success(response, resolve, reject);
          },
          (errors: any) => reject(errors)
        );
    });
  };

  // fn get passengers
  getPassengers = () => {
    return new Promise((resolve, reject) => {
      return this._api
        .get(`account/passenger`, {})
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn create new passenger
  postPassenger = (data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .post(`account/passenger`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn update new passenger
  putPassenger = (id: string = '', data: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._api
        .put(`account/passenger/${id}`, data)
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn delete passenger
  deletePassenger = (code: string = '') => {
    return new Promise((resolve, reject) => {
      return this._api
        .delete(`account/passenger/${code}`, {})
        .then(
          (response: any) => this.success(response, resolve, reject),
          (errors: any) => reject(errors)
        );
    });
  };
}
