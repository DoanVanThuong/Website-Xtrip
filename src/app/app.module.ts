import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {RestangularModule} from 'ngx-restangular';
import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider, SocialLoginModule,
} from 'angularx-social-login';
import {RestangularConfigFactory} from './restangular.config';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from '@angular/material';
import {ToastrModule} from 'ngx-toastr';

import {routing} from './app.routing';
import {PagesModule} from './pages/pages.module';

import {CommonModule as AppCommonModule} from './common/common.module';
import {ComponentsModule as AppComponentModule} from './components/components.module';
import {LayoutModule} from './layout/layout.module';

import {DeviceService, StorageService} from './common/index';
import {AppComponent} from './app.component';

import {AuthLoggedIn} from './auth.loggedIn';
import {AuthRequest} from './auth.request';
import {GlobalState} from './global.state';
import {environment} from '../environments/environment';
import {MbscModule} from 'mobiscroll-angular';

import {Angulartics2Module} from 'angulartics2';
import {AppPreloadStrategy} from './app.preload.stratecy';
import {SharedModule} from './pages/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpConfigInterceptor} from './http.interception';
import {Blanks} from "./pages/blanks/blanks.component";
import {BlanksModule} from "./pages/blanks/blanks.module";
import {XtripModule} from "./pages/xtrip/xtrip.module";

// perfect scrollbar
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// social media
export function provideConfig() {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID)
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.FACEBOOK_CLIENT_ID)
    }
  ]);
}

// material ripple config
const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

@NgModule({
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    routing,
    PagesModule,
    BlanksModule,
    XtripModule,
    SharedModule,

    BrowserModule.withServerTransition({appId: 'xtrip'}),
    BrowserTransferStateModule,
    HttpClientModule,
    BrowserAnimationsModule,

    Angulartics2Module.forRoot({
      pageTracking: {
        clearIds: false,
        clearHash: true,
        clearQueryParams: true,
      },
    }),
    RestangularModule.forRoot([StorageService, GlobalState, DeviceService], RestangularConfigFactory),
    DeviceDetectorModule.forRoot(),

    PerfectScrollbarModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      closeButton: false,
      positionClass: 'toast-bottom-full-width',
      tapToDismiss: true,
      progressAnimation: 'increasing',
      progressBar: false,
      timeOut: 5 * 1000, // 3s,
    }),
    SocialLoginModule,
    MbscModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [],
  providers: [
    AuthLoggedIn,
    AuthRequest,
    GlobalState,
    AppPreloadStrategy,
    {
      provide: 'SERVER_API_URL',
      useValue: environment.API_URL
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: globalRippleConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
