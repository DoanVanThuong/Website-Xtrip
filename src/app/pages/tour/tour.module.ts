import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MatInputModule, MatTabsModule} from '@angular/material';
import {MbscModule} from 'mobiscroll-angular';
import {BarRatingModule} from 'ngx-bar-rating';
import {NgxGalleryModule} from 'ngx-gallery';
import {TextMaskModule} from 'angular2-text-mask';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {routing} from './tour.routing';
import {TourComponent} from './tour.component';
import {LayoutModule} from '../../layout/layout.module';
import {TourGroupComponent} from './group/tour-group.component';
import {TourArrivalMobileComponent} from './search/arrival/mobile/tour-arrival-mobile.component';
import {TourResultMobileComponent} from './result/mobile/tour-result-mobile.component';
import {TourTagFilterComponent} from './result/components/tour-tag-filter/tour-tag-filter.component';
import {TourDetailComponent} from './detail/tour-detail.component';
import {TourBookingComponent} from './booking/tour-booking.component';
import {TourReviewComponent} from './review/tour-review.component';
import {TourIndexComponent} from './index/tour-index.component';
import {TourResultComponent} from './result/tour-result.component';
import {TourResultDesktopComponent} from './result/desktop/tour-result-desktop.component';
import {TourFilterDesktopComponent} from './result/components/tour-filter-desktop/tour-filter-desktop.component';
import {TourSearchBarDesktopComponent} from './result/components/tour-search-bar/tour-search-bar-desktop.component';
import {ClickOutsideModule} from 'ng4-click-outside';
import {TourItemDesktopComponent} from './result/components/tour-item-desktop/tour-item-desktop.component';
import {NouisliderModule} from 'ng2-nouislider';
import {TourSortDesktopComponent} from './result/components/tour-sort/tour-sort-desktop.component';
import {TourDetailMobileComponent} from './detail/mobile/tour-detail-mobile.component';
import {TourDetailDesktopComponent} from './detail/desktop/tour-detail-desktop.component';
import {TourInfoDetailDesktopComponent} from './detail/components/tour-info/tour-info.component';
import {TourCarouselDesktopComponent} from './detail/components/tour-carousel/tour-carousel.component';
import {OwlModule} from 'ngx-owl-carousel';
import {TourGalleryPopup} from './detail/components/tour-gallery-popup/tour-gallery.popup';
import {ModalModule, BsDropdownModule, BsDatepickerModule} from 'ngx-bootstrap';
import {TourRelatedDesktopComponent} from './detail/components/tour-related/tour-related.component';
import {TourContactDesktopComponent} from './detail/components/tour-contact/tour-contact.component';
import {TourBookingMobileComponent} from './booking/mobile/tour-booking-mobile.component';
import {TourBookingDesktopComponent} from './booking/desktop/tour-booking-desktop.component';
import {TourBookingInfoDesktopComponent} from './booking/components/tour-info/tour-info.component';
import {TourDetailPopupComponent} from './booking/components/tour-detail/tour-detail-popup.component';
import {TourPriceDetailDesktopComponent} from './booking/components/tour-price-detail/tour-price-detail.component';
import {TourDatepickerComponent} from './detail/components/tour-datepicker/tour-datepicker.component';
import {TourDateSelectorComponent} from './search/tour-date-picker/tour-date.component';
import {TourArrivalPopup} from './result/components/popup/tour-arrival-popup/tour-arrival-popup.component';
import {TourFilterPopup} from './result/components/popup/tour-filter-mobile-popup/tour-filter-mobile.popup';
import {TourPassengerPopupComponent} from './detail/components/popup/passenger/tour-passenger.popup';
import {TourDepartDatePopupComponent} from './detail/components/popup/depart-date/depart-date-popup.popup';
import {TourCustomComponent} from './custom-page/tour-custom.component';
import {TourArrivalComponent} from './search/arrival/tour-arival.component';
import {TourArrivalDesktopComponent} from './search/arrival/desktop/tour-arrival-desktop.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {ClipboardModule} from 'ngx-clipboard';
import {TourAdvisoryPopup} from './detail/components/popup/advisory/tour-advisory.popup';
import {TourDetailResolver} from './detail/tour-detail.resolver';
import {SharedModule} from '../shared/shared.module';
import {TourRecommendComponent} from "./recommend/tour-recommend.component";
import {TourRecommendMobileComponent} from "./recommend/mobile/tour-recommend-mobile.component";
import {TourRecommendDesktopComponent} from "./recommend/desktop/tour-recommend-desktop.component";
import {TourArrivalResolver} from "./tour.resolver";

@NgModule({
  imports: [
    CommonModule,
    AppComponentModule,
    AppCommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    LayoutModule,
    routing,

    PerfectScrollbarModule,
    MatInputModule, MatTabsModule,
    InfiniteScrollModule,
    MbscModule,
    BarRatingModule,
    NgxGalleryModule,
    TextMaskModule,
    BarRatingModule,
    MbscModule,
    ClickOutsideModule,
    NouisliderModule,
    OwlModule,
    ModalModule,
    BsDropdownModule,
    BsDatepickerModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    ClipboardModule
  ],
  providers: [
    TourDetailResolver,
    TourArrivalResolver
  ],
  declarations: [
    TourComponent,

    TourIndexComponent,
    TourArrivalComponent,
    TourArrivalMobileComponent,
    TourArrivalDesktopComponent,
    TourDateSelectorComponent,
    TourGroupComponent,
    TourResultDesktopComponent,
    TourFilterDesktopComponent,
    TourSearchBarDesktopComponent,
    TourItemDesktopComponent,
    TourSortDesktopComponent,
    TourBookingComponent,
    TourReviewComponent,
    TourDetailMobileComponent,

    TourResultComponent,
    TourResultMobileComponent,
    TourTagFilterComponent,

    TourDetailComponent,
    TourDetailDesktopComponent,
    TourInfoDetailDesktopComponent,
    TourCarouselDesktopComponent,
    TourGalleryPopup,
    TourRelatedDesktopComponent,
    TourContactDesktopComponent,

    TourBookingComponent,
    TourBookingMobileComponent,
    TourBookingDesktopComponent,
    TourBookingInfoDesktopComponent,
    TourDetailPopupComponent,
    TourPriceDetailDesktopComponent,
    TourDatepickerComponent,

    TourReviewComponent,

    TourArrivalPopup,
    TourFilterPopup,
    TourPassengerPopupComponent,
    TourDepartDatePopupComponent,
    TourCustomComponent,
    TourAdvisoryPopup,
    TourRecommendComponent,
    TourRecommendMobileComponent,
    TourRecommendDesktopComponent
  ]
})

export class TourModule {
}
