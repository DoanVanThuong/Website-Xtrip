import {NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {CookieModule} from 'ngx-cookie';

import {ApiService} from './api.service';
import {Utils} from './utils';
import {WindowRef, DocumentRef} from './browser-globals';
import {Spinner} from './spinner.service';
import {Script} from './script.service';
import {StorageService} from './storage.service';
import {DomService} from './dom.service';
import {SeoService} from './seo.service';
import {DeviceService} from "./device.service";
import {HttpApiService} from './http-api.service';

@NgModule({
  imports: [
    CookieModule.forRoot(),
  ],
  providers: [

    ApiService,
    HttpApiService,
    StorageService,
    DomService,
    Utils,
    WindowRef,
    DocumentRef,
    Spinner,
    Script,
    SeoService,
    DatePipe,
    DeviceService
  ],
})
export class ServiceModule {
}
