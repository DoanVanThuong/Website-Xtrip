import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService, SeoService} from '../../../../common/services';
import {isPlatformServer} from '@angular/common';
import {ProductReservation, TourReservation} from '../../../../common/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

const PRODUCT = makeStateKey('BOOKING_PRODUCT');

@Component({
  selector: 'booking-product-detail',
  template: `
    <booking-product-detail-mobile *ngIf="isMobile"></booking-product-detail-mobile>
    <booking-product-detail-desktop *ngIf="isDesktop"></booking-product-detail-desktop>
  `
})
export class BookingProductDetailComponent extends AppPage {

  code: string = '';
  product: ProductReservation = new ProductReservation();

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _transferState: TransferState,
              protected _device: DeviceService,
              @Inject(PLATFORM_ID) private platformID: string,
              private _seo: SeoService,
              private _http: HttpClient) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe((params: any) => {

      this._seo.setDeepLink(`product/mybooking/${params.code}`);

      this.getHotel(params.code);
    });
  }

  // fn get hotel
  getHotel = (code: string = '') => {
    this._http
      .post(`${this.getBaseURL()}/booking/tour/mybooking/detail/${code}`, null)
      .subscribe(
        (res: any) => {
          if (res.code.toLowerCase() === 'success') {

            this.product = new ProductReservation(res.data);

            this._seo
              .setTitle(this.product.productName)
              .updateTags([
                {name: 'description', content: this.product.productName},
                {name: 'keywords', content: this.product.productName},
                {property: 'og:image', content: this.utilityHelper.markImageSize(this.product.productPhoto.src)},
                {property: 'og:description', content: this.product.productName},
                {property: 'og:title', content: this.product.productName},
                {property: 'og:title', content: this._router.url}
              ]);
          }
        });
  };
}
