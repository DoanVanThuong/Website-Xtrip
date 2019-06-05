import {Component} from '@angular/core';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-tour',
  template: `
    <app-seo></app-seo>
    <router-outlet></router-outlet>
  `
})

export class TourComponent extends AppBase {

  constructor() {
    super();
  }
}
