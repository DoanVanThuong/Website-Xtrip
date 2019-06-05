import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {BlogListComponent} from './list/blog.component';
import {BlogComponent} from './blog.component';
import {BlogDetailComponent} from './detail/blog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      title: 'Tin tức du lịch - Xtrip',
      description: 'Tin tức du lịch liên tục cập nhật tại Việt Nam và thế giới, ảnh đẹp, video cập nhật trào lưu mới, địa điểm ăn uống, tip đặt phòng, săn vé máy bay',
      keywords: 'tin tức du lịch, cẩm nang du lịch, kinh nghiệm du lịch'
    },
    children: [
      {
        path: '',
        component: BlogListComponent,
      },
      {
        path: ':code/:alias',
        component: BlogDetailComponent,
        data: {
          title: 'Bài viết'
        }
      },

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
