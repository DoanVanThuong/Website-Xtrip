import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppBase } from '../../../../app.base';
import { DeviceService } from '../../../../common';
import { ProductLocationSelectorPopup } from '../../../../components/product/shared/product-location-selector/product-location-selector.component';
import { PRODUCT_TYPE } from 'app/app.constants';

@Component({
  selector: 'app-product-free-n-easy-mobile',
  templateUrl: './product-free-n-easy-mobile.component.html',
  styleUrls: ['./product-free-n-easy-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFreeAndEasyMobileComponent extends AppBase {

  @ViewChild(ProductLocationSelectorPopup) productLocationSelectorPopup: ProductLocationSelectorPopup;

  carouselOptions: any = {
    item: 1,
    navigation: !this.isMobile,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: 10,
    dots: false
  };

  PRODUCT_TYPE = PRODUCT_TYPE;

  constructor(
    private _router: Router,
    protected _activatedRoute: ActivatedRoute,
    protected _device: DeviceService
  ) {
    super();
    this.setDeviceMode(this._device);
  }

  //on open search popup
  openSearchPopup = () => {
    this.productLocationSelectorPopup.show();
  };

  onSelectLocation = ($event: any) => {
    let queryParams = Object.assign({}, {destination: $event.id, name: $event.name, type: PRODUCT_TYPE.FREE_AND_EASY});
    this._router.navigate(['/product/result'], {
      queryParams: queryParams
    })
  };

}
