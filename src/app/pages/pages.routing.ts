import {Routes, RouterModule, UrlSegment, UrlMatchResult} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {Pages} from './pages.component';
import {AuthLoggedIn} from '../auth.loggedIn';

const routes: Routes = [
  {
    path: '',
    component: Pages,
    runGuardsAndResolvers: 'always',
    children: [
      /*{
        path: '',
        loadChildren: './blanks/blanks.module#BlanksModule',
        data: {
          preload: true
        }
      },*/
      {
        path: '',
        loadChildren: './xtrip/xtrip.module#XtripModule',
        resolve: {
          auth: AuthLoggedIn
        },
        data: {
          preload: true
        }
      }
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
