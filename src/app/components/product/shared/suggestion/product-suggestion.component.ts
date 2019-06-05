import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppBase } from 'app/app.base';
import { ProductRepo, Product } from 'app/common';
import { DeviceService } from '../../../../common';
import { PRODUCT_TYPE, PRODUCT_TYPE_API } from 'app/app.constants';


@Component({
  selector: 'app-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductSuggestionComponent extends AppBase {
  
  @Input('title') title: string = '';
  @Input('type') type: string = '';
  @Input('options') options: any = {};

  suggestions: Product[] = new Array<Product>();
  PRODUCT_TYPE = PRODUCT_TYPE;
  PRODUCT_TYPE_API = PRODUCT_TYPE_API;
  
  constructor(
    private _productRepo: ProductRepo,
    private _device: DeviceService
  ) { super(); this.setDeviceMode(this._device); }

  ngOnInit(): void {
    this.getSuggestForUser(this.type);

  }

  // fn get suggest for user
  getSuggestForUser = (type): Promise<any> => {
    
    return this._productRepo
      .getYourSuggestions(type, 0, 6)
      .then(
        (res: any) => {
          this.suggestions = res.data.results.map(product => new Product(product));
        });
  };

}
