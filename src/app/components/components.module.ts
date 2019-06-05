import {NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule as AppCommonModule} from '../common/common.module';

import { BookingFooter } from '../components/booking/booking-footer/booking-footer';
import { BookingOptionalComponent } from '../components/booking/booking-optional/booking-optional.component';
import { BookingOptionalBoxComponent } from '../components/booking/booking-optional-box/booking-optional-box.component';
import { HotelFilterPopup } from '../components/hotel/filter-popup/hotel-filter.popup';
import { TourFilterPopup } from '../components/tour/filter-popup/tour-filter.popup';

import {MatInputModule, MatExpansionModule, MatTabsModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {BsDatepickerModule, BsDropdownModule, ModalModule, TabsModule, TypeaheadModule} from 'ngx-bootstrap';
import {NouisliderModule} from 'ng2-nouislider';
import {MbscModule} from 'mobiscroll-angular';
import {NgxGalleryModule} from 'ngx-gallery';
import {BarRatingModule} from 'ngx-bar-rating';
import {ClipboardModule} from 'ngx-clipboard';
import {OwlModule} from 'ngx-owl-carousel';
import {ClickOutsideModule} from 'ng4-click-outside';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import {
  SmartBannerComponent,
  SpinnerComponent,
  EmptyScreen,
  BookingTourEmptyScreen,
  TourDetailItem,
  FlightDetailItem,
  HotelDetailItem,
  HotelHeading,
  HotelLoadingComponent,
  RoomDetailItemComponent,
  ErrorNotification,
  ErrorNotifications,
  Countdown,
  HotelStars,
  BackTo,
  SigninRequestMobileComponent,
  SigninRequestDesktopComponent,
  Loading,
  FlightLocationSelectorPopup,
  FlightReviewItemComponent,
  FlightFilterPopup,
  FlightStop,
  SignInFormComponent,
  SignUpFormComponent,
  ForgotPasswordFormComponent,
  FlightHeading,
  FlightRuleFareItemComponent,
  FlightStepperComponent,
  StepperBooking,
  ContactInfoComponent,
  PassengerInfoComponent,
  BookingBillInfoComponent,
  PassportComponent,
  CalendarComponent,
  PassengerPassportComponent,
  PassengerIdentityComponent,
  BookOther,
  TourCalendarPopup,
  TourFilterOptionsPopup,
  TourHighlightComponent,
  TourMorePopup,
  TourJourneyDetailPopup, TourPolicyDetailPopup, TourTermDetailPopup,
  TourJourneyDesktopComponent, TourSurcharge, TourTransportComponent,
  PriceDetailPopup,
  HotelMorePopup,
  HotelReviewPopup,
  PointSelectorPopup,
  ApplyCouponPopup,
  CounterComponent,
  DatePickerComponent,
  DatepickerV2Component,
  PriceDetailBoxComponent,
  PassengerItemComponent,
  BookingBillInfoBoxComponent,
  FlightDetailDesktopComponent,
  HotelGalleryPopup,
  HotelDetailBasicComponent,
  HotelMapViewPopup,
  TourDepositPopup,

  //hotel
  ReviewsRatingComponent,
  CheapFlightItemDesktopComponent,
  CheapFlightItemMobileComponent,
  HotelItemComponent,
  CheapFlightCalendarPopup,
  TourItemDesktopComponent,
  MapViewDesktopComponent,

  //payment
  CodFormComponent,
  PaymentTransferDetailComponent,
  PaymentCountdown,
  PaymentNoteComponent,
  PaymentMethodComponent,
  BookingStatusComponent,
  BookingStatusTourComponent,

  //shared: product
  ProductItemDesktopComponent,
  ProductItemMobileComponent,
  ProductLocationSelectorPopup,
  ProductSuggestionComponent,
  ProductPopularLocationComponent,
  ProductTopComponent,
  ProductSearchForm, PriceComponent
} from './index';

import {
  ConfirmBackPopup,
  PassengerSelectorPopup,
  AboutMePopup,
  CancellationPopup,
  QrCodePopup,
  SignInPopup,
  FeedbackPopup,
  ConfirmPopup,
  SignOutPopup,
  RewardPointPopup,
  PaymentTransferPopup,
  PaymentNotPayNowPopup,
  PaymentPayNowPopup,
  PaymentStorePopup,
  PaymentOfficePopup,
  PaymentNapasPopup,
  ChargeFeePopupComponent,
  QuestionPopup,
  ReferencePricePopup,
  PaymentCODPopup,
  ErrorPopupComponent,
  SocialSharing,
  ErrorPopup,
  GalleryPopup,
  DateSelectorPopup,
  PassengerInfoPopup,
  SyncRequestPopup,
  PromotionPopup,
  PromotionResultPopup,
  PromotionSurveyPopup,
  FullScreenMap,
  ChangePasswordPopup,
  PaymentChangePopup,
  TourDatePickerPopup,
  HotelDatePickerPopup,
  IntroPopup
} from './popup/index';
import {environment} from '../../environments/environment';
import {BreadCrumbDesktopComponent} from './common/breadcrumb/breadcrumb.component';
import {AgmCoreModule} from '@agm/core';
// import {AgmOverlays} from './common/lib/agm-overlays';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {ChatInfoPopupComponent} from './popup/chat-info/chat-info.popup';
import {MapComponent} from './common/map/map.component';
import {UiSwitchModule} from 'ngx-ui-switch';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {SplashscreenComponent} from './common/splashscreen/splashscreen.component';
import {AgmOverlays} from 'agm-overlays';
import {ShareModule} from "@ngx-share/core";
import {ShareButtonsModule} from "@ngx-share/buttons";

const APP_COMPONENTS = [
  // common
  PriceComponent,
  SmartBannerComponent,
  SplashscreenComponent,
  Loading,
  SigninRequestMobileComponent,
  SigninRequestDesktopComponent,
  BackTo,
  EmptyScreen,
  BookingTourEmptyScreen,
  ErrorNotification,
  ErrorNotifications,
  Countdown,
  PaymentCountdown,
  HotelStars,
  SpinnerComponent,
  DatePickerComponent,
  DatepickerV2Component,
  SignUpFormComponent,
  CounterComponent,
  BreadCrumbDesktopComponent,
  BookingStatusComponent,
  BookingStatusTourComponent,
  MapComponent,

  //tour
  TourItemDesktopComponent,
  TourDetailItem,
  TourFilterOptionsPopup,
  TourMorePopup,
  TourDepositPopup,
  TourHighlightComponent,

  // flight
  PassengerInfoPopup,
  CheapFlightItemDesktopComponent,
  CheapFlightItemMobileComponent,
  CheapFlightCalendarPopup,
  FlightDetailItem,
  FlightReviewItemComponent,
  FlightLocationSelectorPopup,
  FlightFilterPopup,
  FlightStop,
  FlightStepperComponent,
  FlightHeading,
  FlightRuleFareItemComponent,
  CalendarComponent,
  FlightDetailDesktopComponent,

  // hotel
  HotelItemComponent,
  HotelDetailItem,
  HotelHeading,
  HotelLoadingComponent,
  HotelReviewPopup,
  HotelGalleryPopup,
  HotelDetailBasicComponent,
  HotelMapViewPopup,
  MapViewDesktopComponent,

  // passenger
  PassengerPassportComponent,
  PassengerIdentityComponent,

  // room
  RoomDetailItemComponent,

  //shared: product + free and easy
  ProductLocationSelectorPopup,
  ProductItemDesktopComponent,
  ProductItemMobileComponent,
  ProductSuggestionComponent,
  ProductPopularLocationComponent,
  ProductTopComponent,
  ProductSearchForm,

  // popup
  IntroPopup,
  ChangePasswordPopup,
  PointSelectorPopup,
  ConfirmBackPopup,
  PassengerSelectorPopup,
  SignInPopup,
  AboutMePopup,
  QrCodePopup,
  FeedbackPopup,
  ApplyCouponPopup,
  ConfirmPopup,
  SignOutPopup,
  PriceDetailPopup,
  RewardPointPopup,
  PaymentTransferPopup,
  PaymentNotPayNowPopup,
  PaymentPayNowPopup,
  PaymentStorePopup,
  PaymentOfficePopup,
  PaymentNapasPopup,
  ChargeFeePopupComponent,
  QuestionPopup,
  ReferencePricePopup,
  HotelMorePopup,
  GalleryPopup,
  PaymentCODPopup,
  TourMorePopup,
  TourJourneyDetailPopup, TourPolicyDetailPopup, TourTermDetailPopup,
  TourJourneyDesktopComponent, TourSurcharge, TourTransportComponent,
  TourCalendarPopup,
  CancellationPopup,
  ErrorPopupComponent,
  SocialSharing,
  DateSelectorPopup,
  SignInFormComponent,
  ForgotPasswordFormComponent,
  ErrorPopup,
  SyncRequestPopup,
  PromotionPopup,
  PromotionResultPopup,
  PromotionSurveyPopup,
  FullScreenMap,
  PaymentChangePopup,
  TourDatePickerPopup,
  HotelDatePickerPopup,
  ChatInfoPopupComponent,

  //booking
  StepperBooking,
  ContactInfoComponent,
  PassengerInfoComponent,
  BookingBillInfoComponent,
  BookingBillInfoBoxComponent,
  PassportComponent,
  BookOther,
  PriceDetailBoxComponent,
  PassengerItemComponent,

  //------------------DESKTOP-----------------
  //hotel
  ReviewsRatingComponent,
  //payment
  CodFormComponent,
  PaymentTransferDetailComponent,
  PaymentNoteComponent,
  PaymentMethodComponent
];

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MbscModule,
    MatInputModule, MatExpansionModule, MatTabsModule,
    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_API_KEY, language: 'vi'
    }),
    AgmOverlays,
    AgmSnazzyInfoWindowModule,

    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),

    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    BarRatingModule,
    TextMaskModule,
    NouisliderModule,
    UiSwitchModule.forRoot({
      defaultBgColor: '#D1D1D6',
      color: '#00bf8f'
    }),
    MbscModule,
    ClipboardModule,
    OwlModule,
    ClickOutsideModule,
    PerfectScrollbarModule,
    ShareModule,
    ShareButtonsModule.withConfig({
      include: ['facebook', 'twitter', 'google', 'pinterest', 'messenger', 'telegram', 'whatsapp', 'linkedin'],
      gaTracking: true,
      autoSetMeta: true,
      twitterAccount: 'xtrip',
      prop:{

      }
    }),
    ScrollToModule.forRoot(),
  ],
  declarations: [
    ...APP_COMPONENTS,
    HotelFilterPopup,
    TourFilterPopup,
    BookingFooter,
    BookingOptionalComponent,
    BookingOptionalBoxComponent
  ],
  providers: [],
  exports: [
    ...APP_COMPONENTS,
    HotelFilterPopup,
    TourFilterPopup,
    BookingFooter,
    BookingOptionalComponent,
    BookingOptionalBoxComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})

export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ComponentsModule,
      providers: [],
    };
  }
}
