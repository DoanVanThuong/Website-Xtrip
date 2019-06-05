import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonModule as AppCommonModule} from './../../common/common.module';
import {ComponentsModule as AppComponentModule} from './../../components/components.module';
import {LayoutModule} from "../../layout/layout.module";

import {routing} from './blanks.routing';
import {Blanks} from "./blanks.component";
import {NotFoundComponent} from "./404/not-found.component";
import {RedirectLinkComponent} from "./redirect-link/others-redirect-link.component";


@NgModule({
  imports: [
    AppCommonModule,
    AppComponentModule,
    LayoutModule,

    CommonModule,
    routing,

  ],
  declarations: [
    Blanks,
    NotFoundComponent,
    RedirectLinkComponent
  ],
  providers: []
})

export class BlanksModule {

}
