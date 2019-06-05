import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {routing} from './others.routing';
import {OthersComponent} from './others.component';
import {LayoutModule} from '../../layout/layout.module';
import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';
import {SharedModule} from '../shared/shared.module';
import {IntroductionComponent} from './introduction/introduction.component';

@NgModule({
  exports: [],
  imports: [
    CommonModule,
    AppCommonModule,
    AppComponentModule,
    LayoutModule,
    SharedModule,
    routing,

    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    OthersComponent,
    IntroductionComponent
  ],
  providers: [],
})
export class OthersModule {
}
