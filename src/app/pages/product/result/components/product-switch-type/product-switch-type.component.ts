import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSearch } from '../../../../../common';
import { PRODUCT_TYPE } from 'app/app.constants';

@Component({
  selector: 'app-product-switch-type',
  templateUrl: './product-switch-type.component.html',
  styleUrls: ['./product-switch-type.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSwitchTypeComponent {

  @Input('params') params: any = {};

  PRODUCT_TYPE = PRODUCT_TYPE;

  types = [
    { code: PRODUCT_TYPE.FREE_AND_EASY, display: 'Tour trong ngày' },
    { code: PRODUCT_TYPE.ACTIVITIES, display: 'Vé vui chơi' }
  ];
  isShowDropDown: boolean = false;

  constructor(
    private _router: Router
  ) { }

  //return type product by text
  typeProduct = (params) => {
    let data = new ProductSearch(params);
    switch (data.type.toLowerCase()) {
      case PRODUCT_TYPE.ALL: return 'Tất cả hoạt động'
      case PRODUCT_TYPE.FREE_AND_EASY: return 'Tour trong ngày'
      case PRODUCT_TYPE.ACTIVITIES: return 'Vé tham quan'
    }
  };

  //select type
  selectType(type) {
    this.isShowDropDown == true ? this.isShowDropDown = false : this.isShowDropDown = !this.isShowDropDown;
    let queryParams = Object.assign({}, this.params, { type: type })
    this._router.navigate([`/product/result`], {
      queryParams: queryParams
    });
  };

  //on Hidden Dropdown
  onChangeDropdown() {
    this.isShowDropDown = !this.isShowDropDown;
  }

}
