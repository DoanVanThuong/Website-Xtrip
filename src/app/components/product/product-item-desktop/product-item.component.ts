import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {AppPage} from '../../../app.base';
import {Product, Tour} from '../../../common/entities';

@Component({
  selector: 'home-product-item-desktop',
  templateUrl: './product-item.component.html',
  styleUrls: ['product-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductItemDesktopComponent extends AppPage {

  @Input() product: Product = new Product();

  constructor(private _router: Router) {
    super();
  }

  // fn generate product params
  generateProductParams = (product: Product): any => {
    return {};
  };
}