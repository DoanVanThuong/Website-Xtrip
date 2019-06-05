import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng4-click-outside';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';

import {ProductSearchBarComponent} from '../product/result/components/product-search-bar/product-search-bar.component';
import {FlightDetailDesktopComponent} from '../../components';

@NgModule({
  declarations: [
    ProductSearchBarComponent,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    AppComponentModule,
    RouterModule,

  ],
  exports: [
    ProductSearchBarComponent,
    FlightDetailDesktopComponent,
  ],
  providers: [],
})
export class ShareProductModule {
}