import { ComponentsModule as AppComponentModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './hotel.routing';
import { CommonModule as AppCommonModule } from '../../common/common.module';
import { LayoutModule } from '../../layout/layout.module';

import { MatInputModule } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { BarRatingModule } from 'ngx-bar-rating';
import { MbscModule } from 'mobiscroll-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NouisliderModule } from 'ng2-nouislider';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmOverlays } from 'agm-overlays';
import { OwlModule } from 'ngx-owl-carousel';
import { BsDatepickerModule, ModalModule, BsDropdownModule, AccordionModule } from 'ngx-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HotelComponent } from './hotel.component';
import { HotelTopComponent } from './top/top-hotel.component';
import { HotelRoomComponent } from './room/hotel-rooms.component';
import { HotelPreviewComponent } from './preview/hotel-preview.component';
import { HotelSearchComponent } from '../hotel/search/hotel-search.component';

//Hotel result
import { HotelResultComponent } from './result/hotel-result.component';
import { HotelResultMobileComponent } from './result/mobile/hotel-result-mobile.component';
import { HotelResultDesktopComponent } from './result/desktop/hotel-result-desktop.component';
import {
  HotelSearchBarDesktopComponent,
  HotelSubSearchBarDesktop
} from './result/components/hotel-search-bar/hotel-search-bar-desktop';
import { HotelViewModeDesktopComponent } from './result/components/hotel-view-mode/hotel-view-mode-desktop';
// import {MapViewDesktopComponent} from './result/components/hotel-map-view/hotel-map-view-desktop';
import { HotelBreadcrumbDesktopComponent } from './result/components/hotel-breadcrumb/hotel-breadcrumb-desktop';
import { HotelSortDesktopComponent } from './result/components/hotel-sort/hotel-sort-desktop';
import { HotelFilterDesktopComponent } from './result/components/hotel-filter/hotel-filter-desktop';
import { HotelMapViewModeComponent } from './result/components/hotel-mapview-mode/hotel-mapview-mode.component';
import { HotelBannerDesktopComponent } from './result/components/hotel-banner-desktop/hotel-banner-desktop.component';
import { HotelDetailItemDesktopComponent } from './result/components/detail-item-desktop/hotel-detail-desktop';

//Hotel detail
import { HotelDetailComponent } from './detail/hotel.detail.component';
import { HotelDetailMobileComponent } from './detail/mobile/hotel-detail-mobile.component';
import { HotelDetailDesktopComponent } from './detail/desktop/hotel-detail-desktop.component';
import { HotelCarouselComponent } from './detail/components/hotel-carousel/hotel-carousel.component';
import { HotelRoomDesktopComponent } from './detail/components/hotel-room-desktop/hotel-room-desktop.component';
import { HotelFacilitiesDesktopComponent } from './detail/components/hotel-facilities/hotel-facilities-desktop.component';
import { HotelPolicyDesktop } from './detail/components/hotel-policy/hotel-policy.component';
import { HotelReviewsDesktopComponent } from './detail/components/hotel-reviews/hotel-reviews.component';
import { HotelEquivalentDesktopComponent } from './detail/components/hotel-equivalent/hotel-equivalent.component';
import { RoomDetailMobileComponent } from './room/detail/room-detail.component';

//Hotel booking
import { HotelBookingComponent } from './booking/hotel.component';
import { HotelBookingMobileComponent } from './booking/mobile/hotel-booking-mobile.component';
import { HotelBookingDesktopComponent } from './booking/desktop/hotel-booking-desktop.component';
import { HotelInfoComponentDesktop } from './booking/components/hotel-info/hotel-info.component';
import { HotelRoomPopupComponent } from './booking/components/hotel-room-popup/hotel-room-popup.component';
import { HotelCancellationPolicy } from './booking/components/hotel-cancellation-policy/hotel-cancellation-policy.component';
import { HotelRoomRemaining } from './booking/components/hotel-room-remaining/hotel-room-remaining.component';
import { HotelPriceDetail } from './booking/components/hotel-price-detail/hotel-price-detail.component';
import { HotelIndexComponent } from './index/hotel-index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { HotelInstructionComponent } from './booking/components/hotel-instruction/hotel-instruction.component';
import { ShareHotelModule } from '../shared/share-hotel.module';
import { HotelFalityPopupComponent } from './detail/components/popup/facility/hotel-facility.popup';

//popup
import { HotelLocationSelectorPopup } from './components/location-selector/hotel-location-selector.popup';
import { HotelDetailMapPopupComponent } from './detail/components/popup/map/hotel-detail-map.popup';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'environments/environment';
import { HotelDescriptionPopupComponent } from './detail/components/popup/description/hotel-detail-description.popup';
import { HotelHotPlacePopupComponent } from './detail/components/popup/hot-place/hotel-hot-place.popup';

//component
import { HotelHistorySearchComponent } from './components/hotel-history-search/hotel-history-search.component';
import { HotelRoomPassengerSearchComponent } from './components/room-passenger-search/room-passenger-search.component';
import { HotelRoomPassengerInputComponent } from './components/room-passenger-input/room-passenger-input.component';
import { HotelCheckInCheckOutInfoComponent } from './booking/components/hotel-in-out-info/hotel-in-out-info.component';
import { HotelApplyPointPopupComponent } from './booking/components/hotel-apply-point-popup/hotel-apply-point.popup';
import { HotelApplyCouponPopupComponent } from './booking/components/hotel-apply-coupon-popup/hotel-apply-coupon.popup';
import { CouponDetailItemPopupComponent } from './booking/components/coupon-detail-item-popup/coupon-detail-item.popup';


@NgModule({
  imports: [
    routing,
    CommonModule,
    AppComponentModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,

    MatInputModule,
    InfiniteScrollModule,

    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(), BsDropdownModule,
    AgmOverlays,
    AgmSnazzyInfoWindowModule,
    ScrollToModule.forRoot(),
    NgxGalleryModule,
    ModalModule.forRoot(),
    BarRatingModule,
    MbscModule,
    ClickOutsideModule,
    NouisliderModule,
    OwlModule,
    UiSwitchModule.forRoot({
      defaultBgColor: '#D1D1D6',
      color: '#00bf8f'
    }),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    ShareHotelModule,
    AccordionModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_API_KEY, language: 'vi'
    }),
  ],
  declarations: [
    HotelComponent,
    HotelIndexComponent,
    HotelTopComponent,
    HotelSearchComponent,
    HotelRoomComponent,
    HotelPreviewComponent,

    //Hotel result
    HotelResultComponent,
    HotelResultMobileComponent,
    HotelResultDesktopComponent,

    // components
    HotelSearchBarDesktopComponent,//search bar,
    HotelSubSearchBarDesktop,
    HotelViewModeDesktopComponent,//switch between map/list
    // MapViewDesktopComponent,//map view
    HotelBreadcrumbDesktopComponent,
    HotelSortDesktopComponent,//sort
    HotelFilterDesktopComponent,//filter-popup-popup
    HotelMapViewModeComponent,
    HotelRoomPassengerSearchComponent,
    HotelRoomPassengerInputComponent,
    HotelBannerDesktopComponent,
    HotelDetailItemDesktopComponent,

    //Hotel detail
    HotelDetailComponent,//switch mode manager
    HotelDetailMobileComponent,//mobile mode
    HotelDetailDesktopComponent,//desktop mode
    HotelCarouselComponent,//hotel carousel
    HotelRoomDesktopComponent,//hotel room item
    HotelFacilitiesDesktopComponent,//hotel facilities
    HotelPolicyDesktop,//hotel policy
    HotelReviewsDesktopComponent,//hotel reviews
    HotelEquivalentDesktopComponent,//hotel equivalent
    RoomDetailMobileComponent,
    HotelFalityPopupComponent,

    //Hotel booking
    HotelBookingComponent,//switch mode manager
    HotelBookingMobileComponent,//mobile mode
    HotelBookingDesktopComponent,//desktop mode
    HotelInfoComponentDesktop,//hotel info
    HotelRoomPopupComponent,//hotel room popup
    HotelCancellationPolicy,//hotel cancelation policy
    HotelRoomRemaining,//hotel room remaining
    HotelPriceDetail,//hotel price summary detail
    HotelInstructionComponent,
    HotelCheckInCheckOutInfoComponent,

    //popup
    HotelLocationSelectorPopup,
    HotelDetailMapPopupComponent,
    HotelDescriptionPopupComponent,
    HotelHotPlacePopupComponent,

    HotelHistorySearchComponent,
    HotelApplyPointPopupComponent,
    HotelApplyCouponPopupComponent,
    CouponDetailItemPopupComponent
  ]
})

export class HotelModule {
}
