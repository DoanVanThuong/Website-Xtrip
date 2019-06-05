import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonModule as AppCommonModule} from './../common/common.module';
import {ComponentsModule as AppComponentModule} from './../components/components.module';
import {LayoutModule} from "../layout/layout.module";

import {routing} from './pages.routing';
import {Pages} from './pages.component';
import {Blanks} from "./blanks/blanks.component";


@NgModule({
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    CommonModule,
    routing,

  ],
  declarations: [
    Pages
  ],
  providers: []
})

export class PagesModule {

}
