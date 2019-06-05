import {CSECURITY, EVENT} from './app.constants';
import {environment} from '../environments/environment';
import {isPlatformBrowser} from '@angular/common';

// Function for setting the default restangular configuration
export function RestangularConfigFactory(RestangularProvider, storage, state, device, platformId) {

  RestangularProvider.setBaseUrl(environment.API_URL);
  RestangularProvider.setFullResponse(true);
  RestangularProvider.setDefaultHttpFields({withCredentials: false, cache: false, timeout: 60000});

  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {

    /*if (isPlatformBrowser(platformId) && !navigator.onLine) {
      state.notifyTo(EVENT.OFFLINE, true);
    }*/

    // Update Authorization header
    let authHeader = {};
    let authToken = storage.getItem(CSECURITY.tokenName);
    if (authToken) {
      authHeader = {Authorization: `Bearer ${authToken}`};
    }

    // device id
    authHeader['DeviceID'] = device.getDeviceID();

    //Set App version
    authHeader['App-Version'] = environment.APP_VERSION;
    authHeader['DeviceName'] = device.isDesktop() ? 'Desktop' : 'Mobile';

    return {
      element: element,
      operation: operation,
      path: path,
      url: url,
      headers: Object.assign({}, headers, authHeader),
      params: Object.assign({}, params),
    };
  });

  RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {

    // reset base url
    if (url.indexOf(environment.API_URL) === -1) {
      RestangularProvider.setBaseUrl(environment.API_URL);
    }

    let responseArr = [];

    responseArr['data'] = data;

    return responseArr;
  });

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {

    switch (response.status) {
      case 401: {
        state.notifyTo(EVENT.UNAUTHORIZED, true);
        break;
      }
    }

    return true;
  });
}
