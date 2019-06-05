import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, SeoService} from '../../../common/services';
import {ProductSearch} from '../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductDestination } from 'app/common/entities/product-destination.entity';

@Component({
  selector: 'app-product-result',
  template: `
    <app-product-result-desktop *ngIf="isDesktop"></app-product-result-desktop>
    <app-product-result-mobile *ngIf="isMobile"></app-product-result-mobile>
  `

})
export class ProductResultComponent extends AppBase {

  productSearch: ProductSearch = new ProductSearch();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _seo: SeoService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {

      this.productSearch = new ProductSearch(Object.assign({}, params, {
        destination: new ProductDestination({
          id: params.destination
        }),
      }));

      this._seo
        .setDeepLink(`product/result`, {
          name: this.productSearch.name,
          destination: this.productSearch.destination.id,
          type: this.productSearch.type
        });
    });
  }

}
