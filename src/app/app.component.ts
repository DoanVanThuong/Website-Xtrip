import {Component, HostListener, Inject, Optional, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {isPlatformBrowser, Location} from '@angular/common';
import {AppBase} from './app.base';
import {GlobalRepo, MessageRepo, TourRepo} from './common/repos';
import {DeviceService, Script, SeoService} from './common/services';
import {environment} from '../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Security} from './common/security';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Angulartics2GoogleTagManager} from 'angulartics2/gtm';
import {GlobalState} from './global.state';
import {EVENT} from './app.constants';
import {setTheme} from "ngx-bootstrap/utils";

declare var window: any;

@Component({
  selector: 'app-root',
  template: `
    <router-outlet>
      <app-spinner></app-spinner>
    </router-outlet>
  `
})
export class AppComponent extends AppBase {

  isVMTravel: boolean = false;

  constructor(private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _security: Security,
              private _state: GlobalState,
              private _messageRepo: MessageRepo,
              private _globalRepo: GlobalRepo,
              private _toaster: ToastrService,
              private _device: DeviceService,
              private _script: Script,
              private _location: Location,
              private _seo: SeoService,
              private _ngticGoogleAnalytics: Angulartics2GoogleAnalytics,
              private _ngticGoogleTagManager: Angulartics2GoogleTagManager,
              @Optional() @Inject('device') private device: any,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();

    setTheme('bs4');

    this.setDeviceMode(_device);

    if (isPlatformBrowser(platformId)) {
      this._ngticGoogleAnalytics.startTracking();
      this._ngticGoogleTagManager.startTracking();

      this.isVMTravel = this.utilityHelper.isVietmapTravel(window.location.href);

      this._router.initialNavigation();

      // on load libs
      this._script
        .load()
        .then(
          (res: any) => {
            window.dataLayer = window.dataLayer || [];

            this.pushGoogleTag('js', new Date());
            this.pushGoogleTag('config', environment.GOOGLE_ANALYTIC_ID);
          }
        );
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent) {
    if (this.isProduction) {
      console.clear();
    }
  }

  ngOnInit() {

    // detect router event
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd)
      )
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        if (isPlatformBrowser(this.platformId)) {
          this.checkOnline();
          window.setTimeout(this.scrollTop, 100);
        }

      });

    // detect user unauthorized
    this._state.subscribe(EVENT.UNAUTHORIZED, (value) => {
      this._security.removeToken();

      if (this.isDesktop) {
        this._router.navigate(['/'], {
          queryParams: {
            type: 'login',
            url: this._router.url
          }
        });
      } else {

        this._router.navigate(['/authentication'], {
          queryParams: {
            url: this._router.url
          }
        });
      }
    });

    this._state.subscribe(EVENT.OFFLINE, (value) => {
      if (!!value) {
        this._toaster.error('Vui lòng kiểm tra lại kết nối mạng', 'Lỗi');
      }
    });

    // on browser
    if (isPlatformBrowser(this.platformId)) {
      this.pushNotification();
      this.onPushDeviceInfo();
    }
  }

  // fn push google tag params
  pushGoogleTag(...param: any []) {
    window.dataLayer.push(arguments);
  };

  // fn push notification
  pushNotification() {
    this._state.notifyTo(EVENT.NOTIFICATION_CHANGED, true);
  }

  // fn check online
  checkOnline() {
    if (!navigator.onLine) {
      this._toaster.error('Vui lòng kiểm tra lại kết nối mạng');
    }
  }

  // fn push device info
  onPushDeviceInfo = () => {
    if (!this._device.deviceID) {
      window.setTimeout(this.onPushDeviceInfo, 200);
      return false;
    }

    // update device
    return this._globalRepo
      .updateDevice({
        Code: this._device.getDeviceID(),
        OSName: this._device.deviceInfo.os,
        OSVersion: this._device.deviceInfo.osVersion,
        Model: window.navigator.model,
        Product: window.navigator.product,
        // FireToken: fireToken,
        // DeviceToken: deviceToken
      });
  };
};
