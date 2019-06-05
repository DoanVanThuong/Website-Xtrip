import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../app.base';

@Component({
  selector: 'app-others',
  template: `
    <app-seo></app-seo>
    <router-outlet>
      <!--<app-spinner></app-spinner>-->
    </router-outlet>
  `
})
export class OthersComponent extends AppPage {

  constructor(private _router: Router) {
    super();
  }
}