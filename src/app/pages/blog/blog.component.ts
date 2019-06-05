import {Component} from '@angular/core';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-blog',
  template: `
    <app-seo></app-seo>
    <router-outlet>
      <app-spinner></app-spinner>
    </router-outlet>
  `,

})
export class BlogComponent extends AppBase {

  constructor() {
    super();
  }
}
