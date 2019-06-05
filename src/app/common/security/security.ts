import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CSECURITY} from './../../app.constants';
import {GlobalState} from './../../global.state';
import {User} from '../entities/index';
import {ApiService} from '../services/api.service';
import {StorageService} from '../services/storage.service';
import {AuthRepo} from '../repos';

let INTERNAL_REQUEST_LOADING = null;

@Injectable()
export class Security {

  protected static _currentUser: User;
  protected static _authToken;

  constructor(protected _router: Router,
              protected _authRepo: AuthRepo,
              protected _state: GlobalState,
              protected _storage: StorageService) {
  }

  // fn response success
  protected responseSuccess(response: any = {}, resolve: any) {

    if (!!response.access_token) {

      // this._tokenService.setToken(response.access_token);
      this._storage.setItem(CSECURITY.tokenName, response.access_token, false);
      this._storage.setItem(CSECURITY.expiresIn, response.expires_in, false);
      this._storage.setItem(CSECURITY.refreshToken, response.refresh_token, false);

    }

    resolve(response);
    INTERNAL_REQUEST_LOADING = null;
  }

  // fn response error
  protected responseError(response, resolve) {

    resolve(response);
    INTERNAL_REQUEST_LOADING = null;
  }

  // fn sign in
  signIn = (email: string = '', password: string = '') => {

    return new Promise((resolve, reject) =>
      this._authRepo
        .signIn(email, password)
        .then(
          (response: any) => {
            if (response.status) {
              this.responseSuccess(response.data, resolve);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        )
    );
  };

  // fn sign in with facebook
  signInWithFacebook(access_token: string = '') {

    return new Promise((resolve, reject) => {
        this._authRepo
          .signInFB(access_token)
          .then(
            (response: any) => {

              if (response.status) {
                this.responseSuccess(response.data, resolve);

              } else {
                reject(response.errors);
              }
            },
            (errors: any) => reject(errors));
      }
    );
  }

  // fn sign in with google
  signInWithGoogle(access_token: string = '') {
    return new Promise((resolve, reject) => {
      this._authRepo
        .signInGG(access_token)
        .then(
          (response: any) => {
            if (response.status) {
              this.responseSuccess(response.data, resolve);

            } else {
              reject(response.errors);
            }
          },
          (errors: any) => reject(errors)
        );
    });
  }

  // fn reset password
  resetPassword = (params: any = {}) => {
    return new Promise((resolve, reject) => {
      return this._authRepo
        .reset(params)
        .then(
          (response: any) => resolve(response),
          (errors: any) => reject(errors)
        );
    });
  };

  // fn sign up
  signUp(params: any = {}) {

    return new Promise((resolve, reject) =>
      this._authRepo
        .signUp(params)
        .then(
          (response: any) => {

            if (response.status) {
              this.responseSuccess(response.data, resolve);

            } else {
              reject(response.errors);
            }
          },
          errors => reject(errors)
        )
    );
  }

  // fn sign out
  signOut() {

    return new Promise((resolve, reject) => {

      return this._authRepo
        .signOut()
        .then(
          (response: any) => {

            if (response.status) {

              this.removeToken();

              resolve(response);
            } else {
              reject(response.errors);
            }
          },
          (errors: any) => {
            reject(errors);
          }
        );
    });
  }

  // Is the current account authenticated?
  isAuthenticated = (): boolean => {
    return !!Security._currentUser;
  };

  // fn detect authenticated
  isLoggedIn = (): boolean => {
    try {
      const token = this._storage.getItem(CSECURITY.tokenName, false);

      if (token) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  };

  // fn get current account
  getCurrentUser() {
    return Security._currentUser;
  }

  // fn set current user
  setCurrentUser = (user: User) => {
    if (user instanceof User) {
      Security._currentUser = user;
    } else {
      Security._currentUser = new User(user);
    }

  };

  // fn remove token & profile
  removeToken = () => {
    // this._tokenService.removeToken();
    this._storage.removeItem(CSECURITY.tokenName);

    Security._currentUser = null;
    Security._authToken = null;
  };

  // Ask the backend to see if a account is already authenticated - this may be from a previous session.
  auth = (resolve: any) => {

    let authToken = this._storage.getItem(CSECURITY.tokenName, false);

    if (authToken) {
      if (!this.isAuthenticated()) {
        this._authRepo
          .auth()
          .then(
            (response: any) => {
              this.setCurrentUser(response);

              INTERNAL_REQUEST_LOADING = null;

              resolve(response);
            },
            () => this.responseError(false, resolve)
          );
      } else {
        this.responseSuccess(Security._currentUser, resolve);
      }
    } else {
      this.responseError(false, resolve);
    }
  };

  // Ask the backend to see if a account is already authenticated - this may be from a previous session.
  requestCurrentUser() {

    return new Promise((resolve) => {
      if (INTERNAL_REQUEST_LOADING === null) {
        INTERNAL_REQUEST_LOADING = true;
        return this.auth(resolve);
      } else {
        let timer = setInterval(() => {
          if (INTERNAL_REQUEST_LOADING === null) {
            this.auth(resolve);
            clearInterval(timer);
          }
        }, 200);
      }
    });
  }
}
