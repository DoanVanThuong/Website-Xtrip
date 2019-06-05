import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProfileMyPointComponent} from './reward-point/reward-point.component';
import {AccountIndexComponent} from './index/account-index.component';
import {AuthRequest} from '../../auth.request';
import {SettingComponent} from './setting/setting.component';
import {PassengerComponent} from './passenger/passenger.component';
import {PassengerNewComponent} from './passenger/new/passenger.component';
import {AccountInfoComponent} from './info/account-info.component';
import {AccountFillInfoComponent} from './fill-info/fill-info.component';
import {AccountComponent} from './account.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    resolve: {
      auth: AuthRequest
    },

    children: [
      {
        path: '',
        component: AccountIndexComponent,
        data: {
          title: 'Account',
          meta: ''
        }
      },
      {
        path: 'fill-info',
        component: AccountFillInfoComponent,
        data: {
          title: 'Thông tin tài khoản',
          meta: ''
        }
      },
      {
        path: 'information',
        component: AccountInfoComponent,
        data: {
          title: 'Thông tin tài khoản',
          meta: ''
        }
      },
      {
        path: 'reward',
        component: ProfileMyPointComponent,
        data: {
          title: 'Điểm thưởng của tôi',
          meta: ''
        },
      },
      {
        path: 'passenger',
        component: PassengerComponent
      },
      {
        path: 'passenger/add',
        component: PassengerNewComponent
      },
      {
        path: 'passenger/:id/edit',
        component: PassengerNewComponent
      },
      {
        path: 'settings',
        component: SettingComponent,
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
