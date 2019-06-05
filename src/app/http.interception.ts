import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CSECURITY} from './app.constants';
import {environment} from '../environments/environment';
import {DeviceService, StorageService, ApiService, HttpApiService} from './common/services';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private _storage: StorageService,
              private _device: DeviceService,
              private _httpService: HttpApiService,
              ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    

    // access token
    let authToken = this._storage.getItem(CSECURITY.tokenName);
    if (!!authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

    // device id
    request = request.clone({
      headers: request.headers.set('DeviceID', this._device.getDeviceID()),
    });

    // App version
    if(!request.headers.get('App-Version')){
      request = request.clone({
        headers: request.headers.set('App-Version', environment.APP_VERSION),
      });
    }

    request = request.clone({
      headers: request.headers.set('Base-URL', 'https:' + environment.API_URL),
    });
    request = request.clone({
      headers: request.headers.set('DeviceName', this._device.isDesktop() ? 'Desktop' : 'Mobile'),
    });

    // content type
    request = request.clone({
      headers: request.headers.set('Content-TYpe', 'application/json'),
    });


    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

          }
          return event;
        })
      );
  }
}
