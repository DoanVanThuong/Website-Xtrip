import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';

import {CommonModule as AppCommonModule} from '../common/common.module';
import {ComponentsModule as AppComponentModule} from '../components/components.module';

import {HeaderDesktopComponent} from './header/desktop/header-desktop.component';
import {
  HeaderMobileComponent,
  HeaderConfirmBack,
  HeaderDescription,
  HeaderFilter,
  HeaderTitle
} from './header/mobile/header-mobile.component';
import {FooterMobileComponent} from './footer/mobile/footer-mobile.component';
import {FooterDesktopComponent} from './footer/desktop/desktop-footer.component';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {NavigatorComponent} from './navigator/navigator.component';
import {NotificationDesktopComponent} from './header/desktop/component/notifiication/notification-desktop.component';
import {TitleComponent} from './components/title/title.component';
import {SeoComponent} from './components/seo/seo.component';
import {AccountHeaderComponent} from './account-header/account-header.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {SubheaderComponent} from './header/desktop/component/subheader/subheader.component';
import {TopHeaderComponent} from './header/desktop/component/top-header/top-header.component';
import { ScrollToTopComponent } from './footer/components/scroll-to-top/scroll-to-top.component';
import { SocialLinkComponent } from './footer/components/social-link/social-link.component';
import {OwlModule} from 'ngx-owl-carousel';
import {ClickOutsideModule} from 'ng4-click-outside';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';


const APP_COMPONENTS = [
  HeaderDesktopComponent,
  HeaderMobileComponent,
  HeaderConfirmBack,
  HeaderTitle,
  HeaderDescription,
  HeaderFilter,
  TopHeaderComponent,
  ScrollToTopComponent,
  SocialLinkComponent,
  AccountHeaderComponent,
  SubheaderComponent,

  FooterMobileComponent,
  FooterDesktopComponent,

  SeoComponent,
  TitleComponent,
  NavigatorComponent,
  NotificationDesktopComponent,
  BreadcrumbsComponent
];

@NgModule({
  imports: [
    AppCommonModule,
    AppComponentModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ClickOutsideModule,
    InfiniteScrollModule,
    CollapseModule.forRoot(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    OwlModule
  ],
  declarations: [
    ...APP_COMPONENTS
  ],
  providers: [],
  exports: [
    ...APP_COMPONENTS,
  ]
})
export class LayoutModule {

}
