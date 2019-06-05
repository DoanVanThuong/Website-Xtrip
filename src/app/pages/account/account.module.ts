import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
// import {BootstrapSwitchModule} from 'angular2-bootstrap-switch';

import {MatInputModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';

import {OwlModule} from 'ngx-owl-carousel';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {LayoutModule} from '../../layout/layout.module';
import {routing} from './account.routing';

import {ProfileMyPointComponent} from './reward-point/reward-point.component';
import {AccountComponent} from './account.component';
import {ProfileMobileComponent} from './index/mobile/profile.component.mobile';
import {AccountIndexComponent} from './index/account-index.component';
import {SettingComponent} from './setting/setting.component';
import {PassengerComponent} from './passenger/passenger.component';
import {PassengerNewComponent} from './passenger/new/passenger.component';
import {BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {MbscModule} from 'mobiscroll-angular';
import {AccountInfoComponent} from './info/account-info.component';
import {AccountFillInfoComponent} from './fill-info/fill-info.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ClipboardModule} from 'ngx-clipboard';
import {AccountInfoMobileComponent} from './info/mobile/account-info-mobile.component';
import {AccountInfoDesktopComponent} from './info/desktop/account-info-desktop.component';
import {PersonalInfoBoxComponent} from './info/components/personal-info-box/personal-info-box.component';
import {AccountInfoBoxComponent} from './info/components/account-info-box/account-info-box.component';
import {ProfileMyPointMobileComponent} from './reward-point/mobile/reward-point-mobile.component';
import {ProfileMyPointDesktopComponent} from './reward-point/desktop/reward-point-desktop.component';
import {PassengerMobileComponent} from './passenger/mobile/passenger-mobile.component';
import {PassengerDesktopComponent} from './passenger/desktop/passenger-desktop.component';
import {PassengerBoxComponent} from './passenger/components/passenger-box/passenger-box.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    routing,

    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatInputModule,

    MbscModule,
    TextMaskModule,
    OwlModule,
    InfiniteScrollModule,
    ClipboardModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations: [
    AccountComponent,
    AccountIndexComponent,
    AccountFillInfoComponent,

    ProfileMobileComponent,
    SettingComponent,

    AccountInfoComponent,
    AccountInfoMobileComponent,
    AccountInfoDesktopComponent,

    ProfileMyPointComponent,
    ProfileMyPointMobileComponent,
    ProfileMyPointDesktopComponent,

    PassengerComponent,
    PassengerMobileComponent,
    PassengerDesktopComponent,

    // components
    PassengerBoxComponent,
    PersonalInfoBoxComponent,
    AccountInfoBoxComponent,

    PassengerNewComponent
  ],
  entryComponents: []
})
export class AccountModule {
}
