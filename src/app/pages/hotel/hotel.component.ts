import {Component} from '@angular/core';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-hotel',
  template: `
    <app-seo></app-seo>
    <router-outlet>
      
    </router-outlet>
  `,
})
export class HotelComponent extends AppBase {

  constructor() {
    super();
  }

}
