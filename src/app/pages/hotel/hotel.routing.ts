import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {HotelComponent} from './hotel.component';
import {HotelTopComponent} from './top/top-hotel.component';
import {HotelSearchComponent} from './search/hotel-search.component';
import {HotelResultComponent} from './result/hotel-result.component';
import {HotelDetailComponent} from './detail/hotel.detail.component';
import {HotelRoomComponent} from './room/hotel-rooms.component';
import {HotelBookingComponent} from './booking/hotel.component';
import {HotelPreviewComponent} from './preview/hotel-preview.component';
import {HotelIndexComponent} from './index/hotel-index.component';
import { RoomDetailMobileComponent } from './room/detail/room-detail.component';
import { HotelMapViewModeComponent } from './result/components/hotel-mapview-mode/hotel-mapview-mode.component';

export const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    data: {
      title: 'Đặt phòng khách sạn - Xtrip',
      description: 'Đặt phòng khách sạn trực tuyến,với nhiều khách sạn cung cấp dịch vụ trên nhiều nước châu á Dịch vụ chăm sóc & hỗ trợ khách hàng đa ngôn ngữ trên toàn thế ',
      keywords: 'đặt phòng khách sạn, đặt phòng khách sạn trực tuyến, đặt phòng khách sạn giá rẻ,'
    },
    children: [
      {
        path: '',
        component: HotelIndexComponent
      },
      {
        path: 'top-hotel',
        component: HotelTopComponent
      },
      {
        path: 'search',
        component: HotelSearchComponent
      },
      {
        path: 'result',
        component: HotelResultComponent
      },
      {
        path: 'result/map',
        component: HotelMapViewModeComponent
      },
      {
        path: ':code/detail',
        component: HotelDetailComponent
      },
      {
        path: ':code/room',
        component: HotelRoomComponent
      },
      {
        path: ':code/:id',
        component: RoomDetailMobileComponent
      },
      {
        path: 'booking',
        component: HotelBookingComponent
      },
      // {
      //   path: 'review',
      //   component: HotelPreviewComponent
      // }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
