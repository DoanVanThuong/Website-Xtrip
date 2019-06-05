import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BsDatepickerModule, ModalModule, PopoverModule, TabsModule} from 'ngx-bootstrap';
import {OwlModule} from 'ngx-owl-carousel';
import {ClickOutsideModule} from 'ng4-click-outside';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {UiSwitchModule} from 'ngx-ui-switch';

import {routing} from './homepage.routing';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {LayoutModule} from '../../layout/layout.module';
import {SharedModule} from '../shared/shared.module';

import {HomepageComponent} from './homepage.component';
import {HomepageDesktopComponent} from './desktop/homepage-desktop.component';
import {HomepageMobileComponent} from './mobile/homepage-mobile.component';
import {HomeCheapFlightComponent} from './components/cheap-flight/cheap-flight.component';
import {HomeTopHotelComponent} from './components/top-hotel/top-hotel.component';
import {HomeDiscoverComponent} from './components/discover/discover.component';
import {MoreQuestionComponent} from './components/more-question/more-question.component';

import {HomePartnerComponent} from './components/partner/partner.component';
import {HomePopularTourComponent} from './components/popular-tour/popular-tour.component';
import {HomeCheapTourComponent} from './components/cheap-tour/cheap-tour.component';
import {HomeHotelItemComponent} from './components/hotel-item/hotel-item.component';
import {HomeCheapFlightSearchBoxComponent} from './components/cheap-flight-search-box/cheap-flight-search-box.component';
import {HomeCategoryComponent} from './components/category/category.component';
import {HomeHotProductionComponent} from './components/hot-production/hot-production.component';
import {HomeYourSuggestionComponent} from './components/your-suggestion/your-suggestion.component';
import {HomeFavouriteDestinationComponent} from './components/favourite-destination/favourite-destination.component';
import {HomeTourAlbumComponent} from './components/album-tour/album-tour.component';
import {HomeAlbumItemComponent} from './components/album-item/album-item.component';
import {HomeHotTourComponent} from './components/hot-tour/hot-tour.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {HomePromotionComponent} from './components/promotion/promotion.component';
import {VideoPopup} from './components/video-popup/video.popup';
import {HomeAllInOneTourComponent} from "./components/all-in-one-tour/all-in-all-tour.component";
import {HomeProposeTourComponent} from "./components/propose-tour/propose-tour.component";
import {HomeLastTourComponent} from "./components/last-tour/last-tour.component";
import {HomeFreeTourComponent} from "./components/free-tour/free-tour.component";
import {HomeFlightComponent} from "./components/free-tour/component/flight/flight.component";
import {HomeHotelComponent} from "./components/free-tour/component/hotel/hotel.component";
import {HomeProductComponent} from "./components/free-tour/component/product/product.component";
import {HomeEmptyComponent} from "./components/empty/empty.component";
import {HomeCountdownComponent} from "./components/countdown/countdown.component";
import {HomeProductItemComponent} from "./components/product-item/product-item.component";
import {HomepageResolver} from "./homepage.resolver";

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    SharedModule,
    routing,

    FormsModule,

    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),

    InfiniteScrollModule,
    PerfectScrollbarModule,
    UiSwitchModule.forRoot({
      defaultBgColor: '#D1D1D6',
      color: '#00bf8f'
    }),
    MatInputModule,
    ClickOutsideModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    OwlModule,
  ],
  providers: [
    HomepageResolver
  ],
  declarations: [
    HomepageComponent,
    HomepageDesktopComponent,
    HomepageMobileComponent,

    HomeCategoryComponent,
    HomeCheapFlightComponent,
    HomeTopHotelComponent,
    HomePopularTourComponent,
    HomeCheapTourComponent,
    HomeDiscoverComponent,
    MoreQuestionComponent,
    HomePartnerComponent,
    HomeYourSuggestionComponent,
    HomeFavouriteDestinationComponent,

    HomeHotProductionComponent,
    HomeHotelItemComponent,
    HomeCheapFlightSearchBoxComponent,
    HomeTourAlbumComponent,
    HomeAlbumItemComponent,
    HomeHotTourComponent,
    HomePromotionComponent,
    VideoPopup,
    HomeAllInOneTourComponent,
    HomeProposeTourComponent,
    HomeLastTourComponent,
    HomeFreeTourComponent,
    HomeFlightComponent,
    HomeHotelComponent,
    HomeProductComponent,
    HomeEmptyComponent,
    HomeCountdownComponent,
    HomeProductItemComponent
  ]
})
export class HomepageModule {
}
