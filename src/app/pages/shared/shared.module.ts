import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {OwlModule} from 'ngx-owl-carousel';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';

import {HomeBannerComponent} from '../homepage/components/banner/banner.component';
import {HomeTourItemComponent} from '../homepage/components/tour-item/tour-item.component';
import {intersectionObserverPreset, LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  declarations: [
    HomeBannerComponent,
    HomeTourItemComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppComponentModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OwlModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),

  ],
  exports: [
    // homepage
    HomeBannerComponent,
    // tour
    HomeTourItemComponent,
  ],
  providers: [],
})
export class SharedModule {
}
