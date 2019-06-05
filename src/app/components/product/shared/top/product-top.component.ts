import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppBase } from 'app/app.base';
import { ProductRepo, Product } from 'app/common';
import { DeviceService } from '../../../../common';
import { PRODUCT_TYPE, PRODUCT_TYPE_API } from 'app/app.constants';


@Component({
  selector: 'app-product-top',
  templateUrl: './product-top.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductTopComponent extends AppBase {
  
  @Input('title') title: string = '';
  @Input('type') type: string = '';
  @Input('options') options: any = {};
  
  products: Product[] = new Array<Product>();
  PRODUCT_TYPE = PRODUCT_TYPE;
  PRODUCT_TYPE_API = PRODUCT_TYPE_API;
  
  constructor(
    private _productRepo: ProductRepo,
    private _device: DeviceService
  ) { super(); this.setDeviceMode(this._device); }

  ngOnInit(): void {
    this.getHotDeal(this.type);
  }

  // fn get hot deal
  getHotDeal = (type): Promise<any> => {
    
    return this._productRepo
      .getHotDeal(type, this.offset, this.limit)
      .then(
        (res: any) => {
          this.products = res.data.results.map(product => new Product(product));
        }
      )
      .catch((errors: Error[] = []) => {
      });
  };

}
