import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {routing} from './more.routing';
import {MoreComponent} from './more.component';
import {MatInputModule} from '@angular/material';
import {ClipboardModule} from 'ngx-clipboard';
import {GuideMobileComponent} from './guide/mobile/guide.component';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {LayoutModule} from '../../layout/layout.module';
import {AboutMeComponent} from './about-me/about-me.component';
import {PaymentSecurityPolicyComponent} from './policy/payment-security-policy';
import {GeneralTradingPolicyComponent} from './policy/general-trading-policy';
import {InformationSecurityPolicyComponent} from './policy/information-security-policy';
import {AccordionModule, TabsModule, ModalModule, BsDropdownModule} from 'ngx-bootstrap';
import {PolicyComponent} from './policy/policy.component';
import {GuideComponent} from './guide/guide.component';
import {FaqComponent} from './faq/faq.component';
import {GuideDesktopComponent} from './guide/desktop/guide.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MbscModule} from 'mobiscroll-angular';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ClickOutsideModule} from 'ng4-click-outside';

//---------favorite---------
import {FavoriteComponent} from '../more/favorite/favorite.component';
import {FavoriteHotelEmptyScreen} from '../more/favorite/components/empty-screen/favorite-empty-screen.component';

import {FavoriteMobileComponent} from '../more/favorite/mobile/favorite-mobile.component';
import {FavoriteHotelMobileComponent} from '../more/favorite/mobile/hotel/favorite-hotel-mobile.component';
import {FavoriteTourMobileComponent} from '../more/favorite/mobile/tour/favorite-tour-mobile.component';

import {FavoriteComponentDesktop} from '../more/favorite/desktop/favorite-desktop.component';
import {FavoriteHotelDesktopComponent} from '../more/favorite/components/hotel-favorite-desktop/hotel-favorite-desktop.component';
import {FavoriteTourDesktopComponent} from '../more/favorite/components/tour-favorite-desktop/tour-favorite-desktop.component';
//---------favorite---------

//---------coupon---------
import {CouponComponent} from '../more/coupon/coupon.component';
import {CouponDesktopComponent} from '../more/coupon/desktop/coupon-desktop.component';
import {CouponMobileComponent} from './coupon/mobile/coupon-mobile.component';
import {CouponDetailComponent} from './coupon/detail/coupon-detail.component';
import {CouponDetailMobileComponent} from './coupon/detail/mobile/coupon-detail-mobile.component';
import {CouponBanner} from '../more/coupon/components/coupon-banner/coupon-banner.component';
import {CouponItem} from '../more/coupon/components/coupon-item/coupon-item.component';
import {CouponTourItemDetail} from '../more/coupon/components/coupon-tour-item-detail/coupon-tour-item-detail.component';
import {CouponHotelItemDetail} from '../more/coupon/components/coupon-hotel-item-detail/coupon-hotel-item-detail.component';
import {CouponFlightItemDetail} from '../more/coupon/components/coupon-flight-item-detail/coupon-flight-item-detail.component';
//---------coupon---------

//---------faq/request support/guide---------
import {FaqIndexPageComponent} from '../more/desktop/faq-index-page/faq-index-page.component';
import {FaqBannerComponent} from '../more/desktop/components/faq-banner/faq-banner.component';
import {FaqNavigatorComponent} from '../more/desktop/components/faq-navigator/faq-navigator.component';
import {RequestTicketComponent} from '../more/desktop/components/request-ticket/request-ticket.component';
import {SuccessRequestPopup} from '../more/desktop/components/success-request-popup/success-request-popup.component';

import {RequestSupportComponent} from './request-support/request-support.component';
import {RequestSupportMobileComponent} from './request-support/mobile/request-support-mobile.component';
import {RequestSupportDesktopComponent} from './request-support/desktop/request-support-desktop.component';
import {FaqMobileComponent} from './faq/mobile/faq-mobile.component';
import {FaqDesktopComponent} from './faq/desktop/faq-desktop.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';

//---------faq/request support/guide---------


@NgModule({
  exports: [],
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,

    InfiniteScrollModule,
    MatInputModule,
    ClipboardModule,
    MbscModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    ScrollToModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ClickOutsideModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations: [
    MoreComponent,
    PolicyComponent,
    AboutMeComponent,
    PaymentSecurityPolicyComponent,
    GeneralTradingPolicyComponent,
    InformationSecurityPolicyComponent,

    // favorite
    FavoriteComponent,
    FavoriteHotelEmptyScreen,
    FavoriteMobileComponent,
    FavoriteHotelMobileComponent,
    FavoriteTourMobileComponent,
    FavoriteComponentDesktop,
    FavoriteHotelDesktopComponent,
    FavoriteTourDesktopComponent,

    //coupon
    CouponComponent,
    CouponDesktopComponent,
    CouponMobileComponent,
    CouponDetailComponent,
    CouponDetailMobileComponent,
    CouponBanner,
    CouponItem,
    CouponTourItemDetail,
    CouponHotelItemDetail,
    CouponFlightItemDetail,

    //faq/request support/guide
    FaqIndexPageComponent,
    FaqBannerComponent,
    FaqNavigatorComponent,
    RequestTicketComponent,
    SuccessRequestPopup,
    RequestSupportComponent,
    RequestSupportMobileComponent,
    RequestSupportDesktopComponent,

    GuideComponent,
    GuideDesktopComponent,
    GuideMobileComponent,

    FaqComponent,
    FaqMobileComponent,
    FaqDesktopComponent
  ],
  providers: [],
})
export class MoreModule {
}
