import {Routes, RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';
import {ModuleWithProviders} from '@angular/core';
import {ProductFreeAndEasyComponent} from './free-n-easy/product-free-n-easy.component';
import {ProductResultComponent} from './result/product-result.component';
import {ProductActivitiesComponent} from './activities/product-activities.component';
import {ProductBookingComponent} from './booking/product-booking.component';
import {ProductDetailComponent} from './detail/product-detail.component';
import {SelectComboMobileComponent} from './select-combo/select-combo.component';
import {SelectOptionProductMobileComponent} from './select-option/select-option.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Xtrip - Ứng dụng đặt phòng khách sạn, vé máy bay giá rẻ và tour du lịch',
      description: 'Ứng dụng du lịch thông minh giúp săn vé máy bay giá rẻ dễ dàng, đặt phòng khách sạn nhanh chóng và tìm mua tour du lịch hấp dẫn; nhiều ưu đãi mỗi ngày',
      keywords: 'ứng dụng du lịch; săn vé máy bay; book khách sạn; book tour; đặt phòng khách sạn; vé máy bay giá rẻ; xtrip; ứng dụng xtrip; du lịch thông minh; ứng dụng du lịch xtrip; ứng dụng đặt phòng khách sạn; ứng dụng đặt vé máy bay; traveloka;'
    },
    children: [
      {
        path: 'daytour',
        component: ProductFreeAndEasyComponent,
        data: {
          title: ' Tour du lịch tự túc - Xtrip',
          description: 'Cùng Xtrip khám phá vùng đất xinh đẹp này qua lịch trình du lịch tự túc, đến với những vùng đất thơ mộng và trữ tình với biển xanh nắng vàng hay Đà Lạt ngàn hoa, Sapa dầy tuyết.',
          keyword: 'du lịch tự túc, đi du lịch bụi'
        }
      },
      {
        path: 'activities',
        component: ProductActivitiesComponent,
        data: {
          title: 'Vé Vui Chơi - Xtrip',
          keyword: 'Mua vé vui chơi trực tuyến với hàng ngàn điểm vui chơi trong và ngoài nước thoải sức lựa chọn.',
          description: 'Vé khu vui chơi, vé khu giải trí, vé tham quan,'
        }
      },
      {
        path: 'result',
        component: ProductResultComponent

      },
      {
        path: 'booking',
        component: ProductBookingComponent

      },
      {
        path: ':id/detail',
        component: ProductDetailComponent
      },
      {
        path: ':id/detail/:date/combo',
        component: SelectComboMobileComponent,
      },
      {
        path: ':id/detail/:date/option',
        component: SelectOptionProductMobileComponent,
      },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
