import {Component} from '@angular/core';
import {AppBase} from '../../app.base';

@Component({
  selector: 'app-product',
  template: `
    <app-seo></app-seo>
    <router-outlet>
    </router-outlet>
  `
})

export class ProductComponent extends AppBase {

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
