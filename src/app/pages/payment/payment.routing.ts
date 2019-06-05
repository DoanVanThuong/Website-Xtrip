import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PaymentComponent} from './payment.component';
import {PaymentIndexComponent} from './index/payment-index.component';
import {PaymentResultComponent} from './payment-result/payment.result.component';
import {PaymentIndexDeactivateGuard} from './index/payment-index.deactivate.guard';
import {AuthLoggedIn} from '../../auth.loggedIn';

export const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      {
        path: '',
        component: PaymentIndexComponent,
        canDeactivate: [PaymentIndexDeactivateGuard],
        data: {
          title: 'Thanh toán',
          meta: ''
        }
      },
      {
        path: 'result',
        component: PaymentResultComponent,
        data: {
          title: 'Hoàn tất thanh toán',
          meta: ''
        }
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
