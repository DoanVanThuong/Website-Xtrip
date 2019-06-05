import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppBase} from '../../../../app.base';
import {BookingProduct, BookingTour, Error, ProductOption, Security, Spinner, StorageService} from '../../../../common';
import {ProductRepo} from '../../../../common/repos/product.repo';
import {ToastrService} from 'ngx-toastr';
import {CAPP, CSTORAGE, EVENT} from '../../../../app.constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmBackPopup} from '../../../../components/popup';
import {Location} from '@angular/common';
import {ICombo} from '../components/combo-info/combo-info.component';
import {GlobalState} from "../../../../global.state";

const STATUS: any = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
  PRICE_CHANGED: 3
};

@Component({
  selector: 'app-product-booking-mobile',
  templateUrl: './product-booking-mobile.component.html',
  styleUrls: ['./product-booking-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductBookingMobileComponent extends AppBase {

  @ViewChild(ConfirmBackPopup) confirmPopup: ConfirmBackPopup;

  combo: ICombo = null;
  contact: any = {};

  message: string = '';
  contactForm: FormGroup;
  vatForm: FormGroup;
  additionalForm: FormGroup;

  point: number = 0;
  requestId: string = '';
  isInvalid: boolean = false;
  bookingProduct: BookingProduct = new BookingProduct();

  counter: number = 0;
  passenger: any = {
    adults: 0,
    children: 0,
    infants: 0,
    seniors: 0,
    total: 0
  }; // masker
  passengers: any[] = [];
  couponCode: string = '';
  selectedPoint: number = 0;
  error: any = {
    coupon: [],
    point: []
  };

  priceSummary: any = {rewardPoints: 0};
  totalPrice: number = 0;

  constructor(protected _router: Router,
              protected _activatedRouter: ActivatedRoute,
              private _fb: FormBuilder,
              protected _security: Security,
              protected _productRepo: ProductRepo,
              protected _spinner: Spinner,
              protected _toastr: ToastrService,
              private _state: GlobalState,
              private _storage: StorageService,
              private _location: Location) {
    super();
  }

  ngOnInit(): void {

    this.requestId = this._storage.getItem(this.CSTORAGE.PRODUCT_REQUEST_ID) || null;

    if (this.utilityHelper.isNullOrUndefined(this.requestId)) {
      this._router.navigate(['/product/search']);
      return;
    }

    this.bookingProduct = new BookingProduct(this._storage.getItem(CSTORAGE.PRODUCT_BOOKING));

    this.onLoadHistory();
    this.getPassengers();
    this.formInit();
    this.getPriceSummary();
  }

  // fn form init
  formInit = () => {
    this.vatForm = this._fb.group({});
    this.contactForm = this._fb.group({});
    this.additionalForm = this._fb.group({});
  };

  // fn fill data
  onLoadHistory = (): void => {

    if (!this.bookingProduct) {
      this._router.navigate(['/tour']);
    }

    this.couponCode = this.bookingProduct.couponCode || '';
    this.selectedPoint = this.bookingProduct.points || 0;

    if (!this.utilityHelper.isNullOrUndefined(this.bookingProduct.contact)) {
      this.contact = this.bookingProduct.contact;
    }
    if (!this.utilityHelper.isNullOrUndefined(this.bookingProduct.passengers)) {
      this.passengers = this.bookingProduct.passengers;

    }
  };

  // fn get passengers
  getPassengers = (): Promise<any> => {

    return this._productRepo
      .getPassengers({
        requestId: this.requestId
      })
      .then((res: any) => {
        this.passenger = res.data;
      });
  };

  // fn contact form change
  onContactChange = ($event: any) => {
    this.contactForm = $event;
    this.bookingProduct.contact = this.contactForm.value;
  };

  // fn passenger change
  onPassengerChange = (passengers: any[] = []) => {

    this.passengers = passengers;

    this.bookingProduct.passengers = passengers;
    this._storage.setItem(CSTORAGE.PRODUCT_BOOKING, this.bookingProduct);

    return this._productRepo
      .updatePassengers({
        requestId: this.requestId,
        passengers
      })
      .then(
        (res: any) => {

          // cập nhật lại chi tiết
          this.getPriceSummary();
        },
        (errors: Error[] = []) => {

        }
      );
  };

  // fn on pick up message change
  onMessageChange = ($event: any) => {
    this.message = $event;
    this.bookingProduct.message = $event;
  };

  onAdditionalInfoChange = ($event: any) => {
    this.additionalForm = $event;
  };

  // fn on vat change data
  onVATChange = ($event: any) => {
    this.vatForm = $event;
  };

  // fn on submit coupon
  onSubmitCoupon = (couponCode: string = ''): Promise<any> => {

    return this._productRepo
      .applyCoupon({
        requestId: this.requestId,
        couponCode: couponCode
      })
      .then(
        (res: any) => {
          this.couponCode = couponCode;
          this.selectedPoint = 0;
          this.error.coupon = [];

          this.bookingProduct.couponCode = this.couponCode;
          this.bookingProduct.points = this.selectedPoint;
          this._storage.setItem(CSTORAGE.PRODUCT_BOOKING, this.bookingProduct);

          this.getPriceSummary();

          this._state.notifyTo(EVENT.OPTIONAL_CHANGED, {
            couponCode: this.couponCode,
            point: this.selectedPoint
          });
        },
        (errors: Error[] = []) => {
          this.couponCode = '';
          this._state.notifyTo(EVENT.OPTIONAL_CHANGED, {
            couponCode: this.couponCode,
            point: this.selectedPoint
          });
          this.error.coupon = errors;
        });
  };

  // fn on submit point
  onSubmitPoint = (point: number = 0): Promise<any> => {

    return this._productRepo
      .applyPoint({
        requestId: this.requestId,
        points: point
      })
      .then(
        (res: any) => {
          this.selectedPoint = point;
          this.couponCode = '';
          this.error.point = [];

          this.bookingProduct.points = this.selectedPoint;
          this.bookingProduct.couponCode = this.couponCode;
          this._storage.setItem(CSTORAGE.PRODUCT_BOOKING, this.bookingProduct);

          this.getPriceSummary();

          this._state.notifyTo(EVENT.OPTIONAL_CHANGED, {
            couponCode: this.couponCode,
            point: this.selectedPoint
          });
        },
        (errors: Error[] = []) => {
          this.selectedPoint = 0;
          this._state.notifyTo(EVENT.OPTIONAL_CHANGED, {
            couponCode: this.couponCode,
            point: this.selectedPoint
          });
          this.error.point = errors;
        });
  };

  // fn confirm back
  openConfirmBack = (): void => {
    this.confirmPopup.show();
  };

  // fn on disable submit form
  onDisabledSubmit = () => {
    return this.contactForm.invalid || this.additionalForm.invalid || this.vatForm.invalid || this.passengers.length != this.passenger.total;
  };

  onPayment = () => {
    this.updatePerBooking(() => {
      this.onBooking();
    });
  };

  // fn on book product
  async onBooking() {
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút.');

    try {

      const res: any = await this._productRepo
        .makeReservation({
          requestId: this.requestId,
          contact: this.contactForm.value,
          message: this.message
        });

      this.counter = 0;
      await this.onCheckBooking(res.data.reservationCode);

    } catch (errors) {
      this._toastr.error(errors[0].errorMessage, 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
      this._spinner.hide();
    }
  };

  // update perbooking
  async updatePerBooking(callback: Function) {

    this._spinner.show();

    let perBooking: any[] = [];
    const combo = new ProductOption(this._storage.getItem(CSTORAGE.PRODUCT_COMBO) || {});

    if (this.combo) {
      perBooking = combo.options.perBooking;
    }

    // handle data before update perbooking
    let options: Array<any> = [];
    for (let key in this.additionalForm.value) {

      let value = this.additionalForm.value[key];
      let perItem = this.utilityHelper.findInListWith(key, perBooking, 'uuid', null);

      if (value instanceof Array) {

        value = _.map(value, (item, index) => {
          if (!!item[`${key}-${index}`]) {
            return perItem.items[index].value;
          }
        })
          .filter((item) => {
            return !!item;
          })
          .join(',');
      }

      options.push({
        uuid: key,
        value
      });
    }

    try {
      await this._productRepo
        .updateOptionPerBooking({
          requestId: this.requestId,
          options
        });

      // handle after submit perbooking
      if (callback instanceof Function) {
        callback();
      }

    } catch (errors) {
      this._toastr.error(errors[0].value, 'Lỗi');
      this._spinner.hide();
    }
  };

  // fn check booking
  async onCheckBooking(code: string = '') {

    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    this.counter++;
    if (this.counter >= 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau.', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
      return;
    }

    try {

      const res: any = await this._productRepo.checkBookingCode(code);

      switch (res.data.statusCode) {
        case STATUS.PENDING: {
          this.counter++;

          setTimeout(() => {
            this.onCheckBooking(code);
          }, CAPP.PENDING * 1000); //

          break;
        }
        case STATUS.SUCCESS: {
          this._storage.setItem(CSTORAGE.RESERVATION_CODE, res.reservationCode, false);

          this._router.navigate(['/payment'], {
            queryParams: {
              reservationCode: res.data.reservationCode,
              module: 'product'
            }
          });

          break;
        }
        default: {
          this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau', '', {
            positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
          });
          break;
        }
      }

    } catch (errors) {

      this._toastr.error(errors[0].value, 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });

    } finally {
      this._spinner.hide();
    }
  }

  // fn confirm back popup
  onSubmitConfirm = ($event: any = null) => {
    if ($event) {

      return this._productRepo
        .resetSession(this.requestId)
        .then(
          (res: any) => {

            this._storage.removeItem(CSTORAGE.PRODUCT_BOOKING);

            if (this._security.isAuthenticated()) {
              this._location.back();
            } else {
              window.history.back();
            }
          },
          (errors: Error[] = []) => {

          }
        );
    }
  };

  // fn get summary price
  getPriceSummary = (): Promise<any> => {
    return this._productRepo
      .getPriceSummary({
        requestId: this.requestId
      })
      .then(
        (res: any) => {
          this.combo = <ICombo>res.data;
          this.priceSummary = res.data;
          this.point = res.data.rewardPoints;
          this.totalPrice = _.sumBy(res.data.totalItems, 'price');
        }
      );
  };
}

export interface ICombo {
  productName: string;
  duration: string;
  date: string;
  totalPax: number;
  optionName: string;
  notes: string
}
