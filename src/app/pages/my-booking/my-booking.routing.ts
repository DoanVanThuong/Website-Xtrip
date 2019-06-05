import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {MyBookingIndexComponent} from './index/my-booking-index.component';
import {AuthLoggedIn} from '../../auth.loggedIn';
import {MyBookingComponent} from './my-booking.component';
import {BookingTourDetailComponent} from './detail/tour/booking-tour-detail.component';
import {BookingHotelDetailComponent} from './detail/hotel/booking-hotel-detail.component';
import {PaymentGuideComponent} from './components/payment-guide/payment-guide.component';
import {BookingTourDetailPrice} from './detail/tour/price/price.component';
import {QRCodeComponent} from './detail/flight/qr-code/qr-code.component';
import {BookingTourDetailComment} from './detail/tour/comment/comment.component';
import {BookingTourDetailPassenger} from './detail/tour/passenger/passenger.component';
import {BookingTourDetailQRCode} from './detail/tour/qrcode/qrcode.component';
import {BookingFlightDetailComponent} from './detail/flight/booking-flight-detail.component';

import {BookingProductDetailComponent} from './detail/product/booking-product-detail.component';
import {BookingProductDetailPriceComponent} from './detail/product/price/price.component';
import {BookingProductDetailPassengerComponent} from './detail/product/passenger/passenger.component';
import {BookingProductDetailQRCodeComponent} from './detail/product/qrcode/qrcode.component';
import {BookingProductDetailDescriptionComponent} from './detail/product/description/description.component';
import {BookingProductDetailETicketComponent} from './detail/product/e-ticket/e-ticket.component';
import {BookingFlightTicketComponent} from './detail/flight/ticket/ticket.component';
import {BookingHotelRoomComponent} from './detail/hotel/room/room.component';
import {BookingHotelCancelationPolicyComponent} from './detail/hotel/cancelation-policy/cancelation-policy.component';
import {BookingHotelNoteComponent} from './detail/hotel/note/note.component';

import {DepositProgressComponent} from './detail/tour/deposit-progress/deposit-progress.component';
import {DepositHistoryComponent} from './detail/tour/deposit-history/deposit-history.component';

export const routes: Routes = [
  {
    path: '',
    component: MyBookingComponent,
    children: [
      {
        path: '',
        component: MyBookingIndexComponent
      },
      {
        path: 'tour',
        children: [
          {
            path: ':code',
            children: [
              {
                path: '',
                component: BookingTourDetailComponent
              },
              {
                path: 'comment',
                component: BookingTourDetailComment
              },
              {
                path: 'passenger',
                component: BookingTourDetailPassenger
              },
              {
                path: 'price',
                component: BookingTourDetailPrice
              },
              {
                path: 'qrcode',
                component: BookingTourDetailQRCode
              },
              {
                path: 'deposit-progress',
                component: DepositProgressComponent
              },
              {
                path: 'deposit-history',
                component: DepositHistoryComponent
              }
            ]
          }
        ]
      },
      {
        path: 'hotel',
        children: [
          {
            path: ':code',
            children: [
              {
                path: '',
                component: BookingHotelDetailComponent
              },
              {
                path: 'room',
                component: BookingHotelRoomComponent
              },
              {
                path: 'cancelation-policy',
                component: BookingHotelCancelationPolicyComponent
              },
              {
                path: 'note',
                component: BookingHotelNoteComponent
              }
            ]
          }
        ]
      },
      {
        path: 'flight',
        children: [
          {
            path: ':code',
            children: [
              {
                path: '',
                component: BookingFlightDetailComponent
              },
              {
                path: 'qrcode',
                component: QRCodeComponent
              },
              {
                path: 'ticket',
                component: BookingFlightTicketComponent
              },

            ]
          }
        ]
      },

      // product
      {
        path: 'product',
        children: [
          {
            path: ':code',
            children: [
              {
                path: '',
                component: BookingProductDetailComponent
              },
              {
                path: 'passenger',
                component: BookingProductDetailPassengerComponent
              },
              {
                path: 'price',
                component: BookingProductDetailPriceComponent
              },
              {
                path: 'qrcode',
                component: BookingProductDetailQRCodeComponent
              },
              {
                path: 'description',
                component: BookingProductDetailDescriptionComponent
              },
              {
                path: 'e-ticket',
                component: BookingProductDetailETicketComponent
              },
            ]
          }
        ]
      },

      //payment guide
      {
        path: ':module/:code/payment-guide',
        component: PaymentGuideComponent
      },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
