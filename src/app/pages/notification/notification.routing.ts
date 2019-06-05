import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NotificationComponent } from './notification.component';
import { MessageComponent } from './message/message.component';
import { NotificationMobileComponent } from './index/notification-index.component';
import { AuthLoggedIn } from '../../auth.loggedIn';

export const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    children: [
      {
        path: '',
        component: NotificationMobileComponent,
        data: {
          title: 'Thông báo'
        }
      }, {
        path: 'inbox/:code',
        component: MessageComponent,
        data: {
          title: 'Tin nhắn'
        },
      },
    ]
  },


];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
