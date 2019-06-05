import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {routing} from './blog.routing';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {BlogComponent} from './blog.component';
import {LayoutModule} from '../../layout/layout.module';

import {BlogListComponent} from './list/blog.component';
import {BlogDetailComponent} from './detail/blog-detail.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';

const BLOG_PAGE = [
  BlogListComponent,
  BlogDetailComponent
];

@NgModule({
  imports: [
    routing,
    CommonModule,
    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    InfiniteScrollModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  providers: [],
  declarations: [
    BlogComponent,
    ...BLOG_PAGE
  ]
})

export class BlogModule {
}
