import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../../../common/services';
import {Product, ProductSearch} from '../../../../../common/entities';

@Component({
  selector: 'app-product-result-item',
  templateUrl: './product-result-item.component.html',
  styleUrls: ['./product-result-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductResultItemComponent extends AppBase {

  @Input() product: Product = new Product();

  params: any = {};
  productSearch: ProductSearch = new ProductSearch();

  carouselOptions: any = {
    items: 1,
    navigation: true,
    loop: false,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    margin: 0,
    dots: true,
    lazyLoad: true
  };

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  //fn duration playing time
  returnDuration(days: number = 0, hours: number = 0, minutes: number = 0) {
    if (days > 0) {
      return `${days} ngày`;
    } else {
      if (hours > 0) {
        if (minutes > 0) {
          return `${hours} giờ ${minutes} phút`;
        } else {
          return `${hours} giờ`;
        }
      } else return `${minutes} phút`;
    }
  };

  // fn generate query params
  generateQueryParams = (product: Product): any => {
    return {
      type: this.params.type,
      name: product.name,
      destination: this.params.destination || product.destination.id
    };
  };

}
