import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { routing } from './payment.routing';
import { CommonModule as AppCommonModule } from '../../common/common.module';
import { ComponentsModule as AppComponentModule } from '../../components/components.module';

import { LayoutModule } from '../../layout/layout.module';
import { PaymentIndexComponent } from './index/payment-index.component';
import { PaymentIndexMobileComponent } from './index/mobile/payment-index-mobile.component';
import { PaymentIndexDeactivateGuard } from './index/payment-index.deactivate.guard';
import { PaymentIndexDesktopComponent } from './index/desktop/payment-index-desktop.component';
import { ClipboardModule } from 'ngx-clipboard';

import { PaymentResultComponent } from '../payment/payment-result/payment.result.component';
import { PaymentResultMobileComponent } from '../payment/payment-result/mobile/payment-result-mobile.component';
import { PaymentResultDesktopComponent } from '../payment/payment-result/desktop/payment-result-desktop.component';



@NgModule({
  imports: [
    routing,
    AppComponentModule,
    AppCommonModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    LayoutModule,

    ClipboardModule
  ],
  providers: [PaymentIndexDeactivateGuard],
  declarations: [
    PaymentComponent,
    PaymentIndexComponent,
    PaymentIndexMobileComponent,
    PaymentIndexDesktopComponent,
    
    PaymentResultComponent,
    PaymentResultMobileComponent,
    PaymentResultDesktopComponent
  ]
})

export class PaymentModule {
}
