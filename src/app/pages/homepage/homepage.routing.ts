import {HomepageComponent} from './homepage.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomepageResolver} from "./homepage.resolver";

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    resolve: {
      data: HomepageResolver
    }
  }, {
    path: 'home',
    component: HomepageComponent,
    resolve: {
      data: HomepageResolver
    }
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
