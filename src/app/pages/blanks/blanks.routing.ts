import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {Blanks} from './blanks.component';
import {NotFoundComponent} from "./404/not-found.component";
import {RedirectLinkComponent} from "./redirect-link/others-redirect-link.component";

const routes: Routes = [
  {
    path: '',
    component: Blanks,
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: ':category/:type/:id/:alias',
        component: RedirectLinkComponent
      }
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
