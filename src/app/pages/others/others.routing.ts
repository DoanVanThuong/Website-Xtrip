import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {IntroductionComponent} from './introduction/introduction.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent,
        data: {
          title: 'Giới thiệu Vietmap Travel'
        }
      },

    ]
  },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
