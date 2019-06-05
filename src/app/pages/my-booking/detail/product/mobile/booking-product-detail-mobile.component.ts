import {Component, ViewEncapsulation} from '@angular/core';
import {SeoService, Spinner, StorageService} from '../../../../../common/services';
import {AppPage} from '../../../../../app.base';
import {BookingRepo, ProductRepo, ProductReservation, UtilityHelper} from '../../../../../common';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';

@Component({
  selector: 'booking-product-detail-mobile',
  templateUrl: './booking-product-detail-mobile.component.html',
  styleUrls: ['./booking-product-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingProductDetailMobileComponent extends AppPage {

  code: string = '';
  product: ProductReservation = null;
  url: string = '';
  isExpired = false;
  isViewMode: boolean = false;
  selectedLink: any = null;
  links: any[] = [];

  METHOD: any = PAYMENT_METHOD;
  STATUS: any = BOOKING_STATUS;

  constructor(protected _spinner: Spinner,
              protected _productRepo: ProductRepo,
              private _bookingRepo: BookingRepo,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router,
              protected _toast: ToastrService,
              protected _location: Location,
              private _seo: SeoService,
              protected _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;
      this.getProduct(this.code);
    });

    // get next route
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
        return;
      }
    });
  };

  ngOnDestroy() {
    if (this.url.includes('payment/result') && !this.url.includes('mode=change-method')) {
      this._router.navigate(['/']);
    }
  };

  // on get tour detail
  getProduct = (code: string = '') => {

    this._spinner.show('Vui lòng chờ...');

    return this._bookingRepo
      .getBookedProductDetail(code)
      .then(
        (res: any) => {
          this._spinner.hide();

          this.product = new ProductReservation(res.data);
        },
        (errors: any) => {
          let message = 'Đã có lỗi xãy ra khi yêu cầu thông tin tour';
          if (errors.length) {
            message = errors[0].value;
          }

          this._toast.error(message, 'Lỗi');

          this._location.back();
          this._spinner.hide();
        }
      );

  };


  // fn on expired to keep place
  onExpired = () => {
    this.isExpired = true;
  };

  back() {
    this._location.back();
  }

  onOpenETicket = (): void => {

    this.links = this.product.vouchers.map(item => {

      let sub = item.split('/');

      return {
        name: sub[sub.length - 1].split('.')[0],
        link: item
      };
    });

    if (!!this.links.length) {
      this.selectedLink = this.links[0];
      if (this.links.length <= 1) {
        this.isViewMode = true;
      }
    }
  };
} 
