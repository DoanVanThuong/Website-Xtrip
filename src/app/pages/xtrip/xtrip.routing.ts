import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {Xtrip} from './xtrip.component';

const routes: Routes = [
  {
    path: '',
    component: Xtrip,
    children: [
      {
        path: '',
        loadChildren: './../homepage/homepage.module#HomepageModule',
        data: {
          preload: true
        }
      },
      {
        path: 'notification',
        loadChildren: './../notification/notification.module#NotificationModule'
      },
      {
        path: 'more',
        loadChildren: './../more/more.module#MoreModule'
      },
      {
        path: 'my-booking',
        loadChildren: './../my-booking/my-booking.module#MyBookingModule',
        data: {
          preload: true
        }
      },
      {
        path: 'account',
        loadChildren: './../account/account.module#AccountModule',
      },
      {
        path: 'authentication',
        loadChildren: './../authentication/authentication.module#AuthenticationModule'
      },
      {
        path: 'blog',
        loadChildren: './../blog/blog.module#BlogModule'
      },
      {
        path: 'flight',
        loadChildren: './../flight/flight.module#FlightModule',
        data: {
          preload: true,
        }
      },
      {
        path: 'hotel',
        loadChildren: './../hotel/hotel.module#HotelModule',
        data: {
          preload: true,
        }
      },
      {
        path: 'tour',
        loadChildren: './../tour/tour.module#TourModule',
        data: {
          preload: true
        }
      },
      {
        path: 'payment',
        loadChildren: './../payment/payment.module#PaymentModule'
      },
      {
        path: 'product',
        loadChildren: './../product/product.module#ProductModule',
        data: {
          preload: true
        }
      },
      {
        path: '',
        loadChildren: './../others/others.module#OthersModule'
      }
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
