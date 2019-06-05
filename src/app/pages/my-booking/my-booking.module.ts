import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {BarRatingModule} from 'ngx-bar-rating';
import {MatInputModule, MatExpansionModule} from '@angular/material';
import {AccordionModule, CollapseModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';

import {routing} from './my-booking.routing';
import {MyBookingIndexComponent} from './index/my-booking-index.component';
import {FlightBookedComponent} from './index/components/flight/flight-booked.component';
import {TourBookedComponent} from './index/components/tour/tour-booked.component';
import {HotelBookedComponent} from './index/components/hotel/hotel-booked.component';
import {MyBookingComponent} from './my-booking.component';
import {BookingTourDetailComponent} from './detail/tour/booking-tour-detail.component';
import {BookingTourDetailComment} from './detail/tour/comment/comment.component';
import {BookingTourDetailPassenger} from './detail/tour/passenger/passenger.component';
import {BookingTourDetailPrice} from './detail/tour/price/price.component';
import {BookingTourDetailQRCode} from './detail/tour/qrcode/qrcode.component';
import {BookingHotelDetailComponent} from './detail/hotel/booking-hotel-detail.component';
import {BookingHotelDetailComment} from './detail/hotel/comment/comment.component';
import {BookingHotelDetailPrice} from './detail/hotel/price/price.component';
import {BookingHotelDetailQRCode} from './detail/hotel/qrcode/qrcode.component';
import {BookingHotelDetailDescription} from './detail/hotel/description/description.component';
import {BookingFlightDetailComponent} from './detail/flight/booking-flight-detail.component';
import {PaymentGuideComponent} from './components/payment-guide/payment-guide.component';
import {QRCodeComponent} from './detail/flight/qr-code/qr-code.component';
import {LayoutModule} from '../../layout/layout.module';
import {MyBookingFlightDetailItem} from './components/flight-item/flight-detail-item.component';
import {HotelBookingDetailItem} from './components/hotel-item/hotel-detail-item.component';
import {TourBookingDetailItem} from './components/tour-item/tour-detail-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyBookingIndexMobileComponent} from './index/mobile/my-booking-index-mobile.component';
import {MyBookingIndexDesktopComponent} from './index/desktop/my-booking-index-desktop.component';
import {BookingFlightDetailMobileComponent} from './detail/flight/mobile/booking-flight-detail-mobile.component';
import {BookingFlightDetailDesktopComponent} from './detail/flight/desktop/booking-flight-detail-desktop.component';
import {PaymentGuideDetailComponent} from './detail/components/payment-guide/payment-guide-detail.component';
import {ClipboardModule} from 'ngx-clipboard';
import {BookingHotelDetailMobileComponent} from './detail/hotel/mobile/booking-hotel-detail-mobile.component';
import {BookingHotelDetailDesktopComponent} from './detail/hotel/desktop/booking-hotel-detail-desktop.component';
import {BookingEmptyComponent} from './components/empty/booking-empty.component';
import {BookingTourDetailMobileComponent} from './detail/tour/mobile/booking-tour-detail-mobile.component';
import {BookingTourDetailDesktopComponent} from './detail/tour/desktop/booking-tour-detail-desktop.component';
import {ReviewBoxComponent} from './detail/components/review/review-box.component';
import {CommentPopup} from './detail/components/comment-popup/comment.popup';
import {SucceedReviewPopup} from './detail/components/succeed-review-popup/succeed-review.popup';
import {ChangePaymentMethod} from './detail/components/change-payment-method/change-payment-method.component';
import {ChangePaymentMethodPopup} from './components/method-change-payment-popup/method-change-payment.popup';

import {MyBookingFlightBasicDetail} from './../my-booking/detail/components/flight-basic-detail/flight-basic-detail.component';
import {MyBookingHotelBasicDetail} from './../my-booking/detail/components/hotel-basic-detail/hotel-basic-detail.component';
import {MyBookingTourBasicDetail} from './../my-booking/detail/components/tour-basic-detail/tour-basic-detail.component';
import {ProductBookedComponent} from './index/components/product/product-booked.component';
import {ProductBookingDetailItem} from './components/product-item/product-detail-item.component';
import {BookingProductDetailMobileComponent} from './detail/product/mobile/booking-product-detail-mobile.component';
import {BookingProductDetailComponent} from './detail/product/booking-product-detail.component';
import {BookingProductDetailQRCodeComponent} from './detail/product/qrcode/qrcode.component';
import {BookingProductDetailPriceComponent} from './detail/product/price/price.component';
import {BookingProductDetailPassengerComponent} from './detail/product/passenger/passenger.component';
import {BookingProductDetailDescriptionComponent} from './detail/product/description/description.component';
import {BookingProductDetailETicketComponent} from './detail/product/e-ticket/e-ticket.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MyBookingProductBasicDetail} from './detail/components/product-basic-detail/product-basic-detail.component';
import {BookingProductDetailDesktopComponent} from './detail/product/desktop/booking-product-detail-desktop.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';
import {BookingFlightTicketComponent} from './detail/flight/ticket/ticket.component';
import {BookingFlightReportPopup} from './detail/components/report-popup/report.popup';
import {BookingPdfReportPopup} from './detail/components/report-pdf-popup/pdf-report.popup';
import {ShareProductModule} from '../shared/share-product.module';
import {BookingHotelRoomComponent} from './detail/hotel/room/room.component';
import { BookingHotelCancelationPolicyComponent } from './detail/hotel/cancelation-policy/cancelation-policy.component';
import { BookingHotelNoteComponent } from './detail/hotel/note/note.component';

import { DepositProgressComponent } from './detail/tour/deposit-progress/deposit-progress.component';
import { DepositProgressBarComponent } from './detail/tour/deposit-progress-bar/deposit-progress-bar.component';
import { DepositHistoryComponent } from './detail/tour/deposit-history/deposit-history.component';

import { PriceDetailComponent } from './detail/components/price-detail-popup/price-detail-popup';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    ShareProductModule,

    MatInputModule, MatExpansionModule,
    BarRatingModule,

    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),

    PdfViewerModule,
    ClipboardModule,
    InfiniteScrollModule,
    PerfectScrollbarModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations: [
    MyBookingComponent,

    MyBookingIndexComponent,
    MyBookingIndexMobileComponent,
    MyBookingIndexDesktopComponent,

    FlightBookedComponent,
    TourBookedComponent,
    HotelBookedComponent,
    ProductBookedComponent,

    // tour
    TourBookingDetailItem,
    BookingTourDetailComponent,
    BookingTourDetailMobileComponent,
    BookingTourDetailDesktopComponent,
    BookingTourDetailComment,
    BookingTourDetailPassenger,
    BookingTourDetailPrice,
    BookingTourDetailQRCode,

    // hotel
    HotelBookingDetailItem,
    BookingHotelDetailComponent,
    BookingHotelDetailMobileComponent,
    BookingHotelDetailDesktopComponent,
    BookingHotelDetailComment,
    BookingHotelDetailPrice,
    BookingHotelDetailQRCode,
    BookingHotelDetailDescription,
    BookingHotelRoomComponent,
    BookingHotelCancelationPolicyComponent,
    BookingHotelNoteComponent,

    //flight
    MyBookingFlightDetailItem,
    BookingFlightDetailComponent,
    BookingFlightDetailMobileComponent,
    BookingFlightDetailDesktopComponent,
    QRCodeComponent,
    BookingFlightTicketComponent,
    BookingFlightReportPopup,

    // product
    ProductBookingDetailItem,
    BookingProductDetailComponent,
    BookingProductDetailMobileComponent,
    BookingProductDetailDesktopComponent,
    BookingProductDetailPassengerComponent,
    BookingProductDetailQRCodeComponent,
    BookingProductDetailPriceComponent,
    BookingProductDetailDescriptionComponent,
    BookingProductDetailETicketComponent,

    // guide
    BookingEmptyComponent,
    PaymentGuideComponent,
    PaymentGuideDetailComponent,
    ReviewBoxComponent,
    CommentPopup,
    SucceedReviewPopup,

    ChangePaymentMethod,
    ChangePaymentMethodPopup,

    MyBookingFlightBasicDetail,
    MyBookingHotelBasicDetail,
    MyBookingTourBasicDetail,
    MyBookingProductBasicDetail,
    DepositProgressComponent,
    DepositProgressBarComponent,
    DepositHistoryComponent,
    PriceDetailComponent,
    BookingPdfReportPopup
  ]
})
export class MyBookingModule {
}
