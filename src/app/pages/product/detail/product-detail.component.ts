import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, Product, SeoService} from 'app/common';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  template: `
    <app-product-detail-desktop *ngIf="isDesktop"></app-product-detail-desktop>
    <app-product-detail-mobile *ngIf="isMobile"></app-product-detail-mobile>
  `
})
export class ProductDetailComponent extends AppBase {

  id: string = ''; // product id
  product: Product = null;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _device: DeviceService,
              private _seo: SeoService,
              private _http: HttpClient) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit(): void {
    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((params: any): void => {
        this.id = params.id || '';

        this.getProduct(this.id);
      });
  }

  // fn get activity detail
  getProduct = (id: string = '') => {

    this._http
      .post(`${this.getBaseURL()}/product/detail/${id}`, null)
      .subscribe((res: any) => {

        if (res.code.toLowerCase() === 'success') {

          this.product = new Product(res.data);

          this._seo
            .setTitle(this.product.name)
            .setDeepLink(`product/${this.product.id}/detail`)
            .updateTags([
              {name: 'description', content: this.product.name},
              {name: 'keywords', content: this.product.name},
              {property: 'og:image', content: this.utilityHelper.markImageSize(this.product.photo.src)},
              {property: 'og:description', content: this.product.name},
              {property: 'og:title', content: this.product.name},
              {property: 'og:url', content: this._router.url}
            ]);
        }
      });
  };
}
