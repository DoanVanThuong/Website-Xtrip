import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AboutMeComponent} from './about-me/about-me.component';
import {MoreComponent} from './more.component';
import {PolicyComponent} from './policy/policy.component';
import {GuideComponent} from './guide/guide.component';
import {FaqComponent} from './faq/faq.component';
import {RequestSupportComponent} from './request-support/request-support.component';

//favorite
import {FavoriteComponent} from '../more/favorite/favorite.component';

//coupon
import {CouponComponent} from './coupon/coupon.component';
import {CouponDetailComponent} from './coupon/detail/coupon-detail.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MoreComponent,
        data: {
          title: 'Xem thêm'
        }
      },
      {
        path: 'about-us',
        component: AboutMeComponent,
        data: {
          title: 'Về chúng tôi'
        }
      },
      {
        path: 'policy',
        component: PolicyComponent,
        data: {
          title: 'Chính sách và điều khoản'
        }
      },
      {
        path: 'guide',
        component: GuideComponent,
        data: {
          title: 'Hướng dẫn sử dụng Xtrip',
        }
      },
      {
        path: 'coupon',
        component: CouponComponent,
        data: {
          title: 'Mã khuyến mãi - Xtrip',
          description: 'Đăng ký nhận mã khuyến mãi của Xtrip, với những ưu đãi hấp dẫn dành cho quý khách hàng sử dụng ứng dụng du lịch thông minh',
          keywords: 'mã khuyến mãi, chương trình khuyến mãi'
        }
      },
      {
        path: 'coupon/:code',
        component: CouponDetailComponent,
        data: {
          title: 'Mã khuyến mãi'
        }
      },
      {
        path: 'favourite',
        component: FavoriteComponent,
        data: {
          title: 'Yêu thích'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'Câu hỏi thường gặp'
        }
      },
      {
        path: 'request-support',
        component: RequestSupportComponent,
        data: {
          title: 'Yêu cầu hỗ trợ'
        }
      }
    ]
  },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
