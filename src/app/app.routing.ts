import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const AppRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {
  // preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
});
