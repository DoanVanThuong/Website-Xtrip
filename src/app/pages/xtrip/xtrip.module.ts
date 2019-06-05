import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonModule as AppCommonModule} from './../../common/common.module';
import {ComponentsModule as AppComponentModule} from './../../components/components.module';
import {LayoutModule} from "../../layout/layout.module";

import {routing} from './xtrip.routing';
import {Xtrip} from "./xtrip.component";


@NgModule({
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    CommonModule,
    routing,

  ],
  declarations: [
    Xtrip
  ],
  providers: []
})

export class XtripModule {

}
