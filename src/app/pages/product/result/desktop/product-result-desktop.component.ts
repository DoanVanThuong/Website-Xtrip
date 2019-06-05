import { Component, ViewEncapsulation } from '@angular/core';
import { ProductResultMobileComponent } from '../mobile/product-result-mobile.component';
import {query, stagger, animateChild, trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-product-result-desktop',
  templateUrl: './product-result-desktop.component.html',
  styleUrls: ['./product-result-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), {optional: true})
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class ProductResultDesktopComponent extends ProductResultMobileComponent {

  //reset filter
  onRestFilter() {
    let queryParmas = Object.assign({}, _.omit(this.params, 'prices', 'options', 'categories'));
    this._router.navigate(['/product/result'], {
      queryParams: queryParmas
    });
  }

}
