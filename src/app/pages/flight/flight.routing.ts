import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FlightResultComponent} from './result/flight-result.component';
import {FlightBookingComponent} from './booking/flight-booking.component';
import {FlightPreviewComponent} from './preview/flight-preview.component';
import {FlightSearchComponent} from './search/flight-search.component';
import {FlightComponent} from './flight.component';
import {FlightResultWay2Component} from './result-two-way/flight-result.component';
import {FlightCheapSearchComponent} from './cheap/search/flight-cheap-search.component';
import {FlightCheapResultComponent} from './cheap/result/flight-cheap-result.component';
import {FlightGroupComponent} from './group/flight-group.component';
import {FlightPreBookingComponent} from './pre-booking/flight-pre-booking.component';
import {FlightIndexComponent} from './index/flight-index.component';

export const routes: Routes = [
  {
    path: '',
    component: FlightComponent,
    data: {
      title: 'Đặt vé máy bay trực tuyến giá rẻ trong nước và quốc tế - Xtrip',
      description: 'Xtrip; Ứng dụng đặt vé máy bay trực tuyến giá rẻ, tìm vé máy bay nhanh chóng, thủ tục đặt vé và thanh toán đơn giản và nhiều khuyến mãi hấp dẫn',
      keywords: 'đặt vé máy bay online, săn vé máy bay giá rẻ'
    },
    children: [
      {
        path: '',
        component: FlightIndexComponent,
      },
      {
        path: 'search',
        component: FlightSearchComponent,
      },
      {
        path: 'group',
        component: FlightGroupComponent,
      },
      {
        path: 'result',
        component: FlightResultComponent,
      },
      {
        path: 'result/return-way',
        component: FlightResultWay2Component,
      },
      {
        path: 'preview',
        component: FlightPreBookingComponent,
        data: {
          title: 'Kiểm tra vé máy bay'
        }
      },
      {
        path: 'booking',
        component: FlightBookingComponent,
      },
      {
        path: 'review',
        component: FlightPreviewComponent,
        data: {
          title: 'Thanh toán vé máy bay'
        }
      },
      {
        path: 'cheap-flight/search',
        component: FlightCheapSearchComponent,
        data: {
          title: 'Săn vé máy bay giá rẻ'
        }
      },
      {
        path: 'cheap-flight/result',
        component: FlightCheapResultComponent,
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
