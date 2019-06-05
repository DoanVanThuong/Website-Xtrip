import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-payment',
  template: `
    <app-seo></app-seo>
    <router-outlet>
      
    </router-outlet>
  `
})
export class PaymentComponent extends AppBase {

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
