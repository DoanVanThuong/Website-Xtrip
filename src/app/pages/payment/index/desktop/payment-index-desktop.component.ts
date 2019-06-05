import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PaymentIndexMobileComponent } from '../mobile/payment-index-mobile.component';
import { BOOKING_MODULE, CBOOKING, CSTORAGE, EVENT, PAYMENT_METHOD } from '../../../../app.constants';
import { Bank, Error, Payment } from '../../../../common/entities';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ConfirmPopup } from '../../../../components/popup';
import { NavigationStart } from '@angular/router';
import { METHODS } from 'http';

@Component({
  selector: 'app-payment-index-desktop',
  templateUrl: './payment-index-desktop.component.html',
  styleUrls: ['./payment-index-desktop.component.less',],
  encapsulation: ViewEncapsulation.None
})
export class PaymentIndexDesktopComponent extends PaymentIndexMobileComponent {

  @ViewChild(ConfirmPopup) confirmPopup: ConfirmPopup;
  messageConfirm: string = 'Giao dịch của bạn chưa hoàn tất. Bạn có thật sự muốn quay lại Trang chủ ?';

  point: number = 0;
  totalPrice: number = 0;
  summaryPrice: any = null;

  vatForm: FormGroup;

  reservationCode: string = '';
  module: string = '';
  MODULE: any = BOOKING_MODULE;

  requestId: string = null;
  couponCode: string = '';
  points: number = 0;
  vatInvoice: any;

  ngOnInit() {

    this.onLoadHistory();

    this._activatedRoute.queryParams.subscribe(params => {

      this.reservationCode = params.reservationCode || '';
      this.module = params.module || '';

      if (this.utilityHelper.isNullOrUndefined(this.reservationCode) ||
        this.utilityHelper.isNullOrUndefined(this.module)) {
        this._router.navigate(['/']);
        return;
      }

      switch (this.module.toLowerCase()) {
        case CBOOKING.FLIGHT: {
          this.requestId = this._storage.getItem(CSTORAGE.FLIGHT_REQUEST_ID) || '';
          break;
        }
        case CBOOKING.HOTEL: {
          this.requestId = this._storage.getItem(CSTORAGE.HOTEL_REQUEST_ID || '');
          break;
        }
        case CBOOKING.TOUR: {
          this.requestId = this._storage.getItem(CSTORAGE.TOUR_REQUEST_ID || '');
          break;
        }
        case CBOOKING.PRODUCT: {
          this.requestId = this._storage.getItem(CSTORAGE.PRODUCT_REQUEST_ID || '');
          break;
        }
      }

      this.onGetSummaryPrice();
    });

    this.onFormInit();
  }

  ngAfterViewInit() {
    this.navigationSubscription = this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

        this.url = event.url;

        if (this.url !== '/' && !this.url.includes('result')) {
          this._state.notifyDataChanged('valid-url', false);

          this.confirmPopup
            .open({
              event: {
                accept: () => {
                  this.onConfirmBack(true);
                },
                cancel: () => {
                  this.onConfirmBack(false);
                }
              }
            }, {
                backdrop: 'static',
              });
        } else {
          this._state.notifyDataChanged('valid-url', true);
        }
      }
    });
  }

  // fn form initial
  onFormInit = () => {
    this.vatForm = this._fb.group({});
    this.contactForm = this._fb.group({});
  };

  // fn on load history
  onLoadHistory = () => {

    // detect history offer
    const offer = this._storage.getItem(CSTORAGE.PAYMENT_OFFER) || null;
    if (!this.utilityHelper.isNullOrUndefined(offer)) {
      switch (offer.type) {
        case 'coupon': {
          this.couponCode = offer.couponCode;
          break;
        }
        case 'point': {
          this.points = offer.points;
          break;
        }
      }
    }

    // load vat data
    this.vatInvoice = this._storage.getItem(CSTORAGE.PAYMENT_VAT) || {};
  };

  // fn get summary price
  onGetSummaryPrice = (): void => {

    switch (this.module.toLowerCase()) {
      case CBOOKING.FLIGHT: {
        // TODO get price of flight
        this.getFlightSummaryPrice();
        break;
      }
      case CBOOKING.HOTEL: {
        // TODO get price of hotel
        this.getHotelSummaryPrice();
        break;
      }
      case CBOOKING.TOUR: {
        // TODO get price of tour
        this.getTourSummaryPrice();
        break;
      }
      case CBOOKING.PRODUCT: {
        // TODO get price of hotel
        this.getProductSummaryPrice();
        break;
      }
    }
  };

  // fn on select payment method
  onSelectPaymentMethod = ($event: any): void => {
    this.selectedPayment = $event.method;
    this.selectedOption = $event.option;
  };

  // fn on update COD
  onUpdateCOD = ($event: any) => {
    this.contactForm = $event;
  };

  // fn apply offer
  onSubmitOffer = ($event: any, type: string = '') => {

    switch (type) {
      case 'coupon': {
        this.onSubmitCoupon({
          requestId: this.requestId,
          couponCode: $event
        });
        break;
      }
      case 'point': {
        this.onSubmitRewardPoint({
          requestId: this.requestId,
          points: $event
        });
        break;
      }
    }
  };

  // fn detect e-bill form change
  onVATChange = ($event: any) => {
    this.vatForm = $event;

    const params = {
      requestId: this.requestId,
      invoiced: this.vatForm.value.isVAT && this.vatForm.valid
    };

    if (params.invoiced) {
      params['vatInvoiceInfo'] = this.vatForm.value;
    }

    this.onSubmitVATInvoice(params);
  };

  // fn detect disabled submit
  detectDisableSubmit = (): boolean => {
    let isValidVat: boolean = this.module === CBOOKING.FLIGHT ? this.vatForm.invalid : false;
    if (!!this.selectedPayment && !!this.selectedPayment.code) {
      switch (this.selectedPayment.code) {
        case PAYMENT_METHOD.TRANSFER:
        case PAYMENT_METHOD.ATM: {
          return !(!!this.selectedOption && !!this.selectedOption.code) || isValidVat;
        }
        case PAYMENT_METHOD.COD: {
          return this.contactForm.invalid || isValidVat;
        }
        default: {
          return false
        }
      }
    }
    return true;

  };

  // fn on submit coupon - detect module
  onSubmitCoupon = (params: any = {}): Promise<any> => {

    this._spinner.show('Đang cập nhật mã khuyến mãi. Vui lòng đợi trong giây lát. Cảm ơn!');

    switch (this.module) {
      default: {
        this._spinner.hide();
        break;
      }
      case CBOOKING.FLIGHT: {
        // TODO push to flight

        return this._ticketRepo
          .pushCounpon(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(params.couponCode);
            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật mã khuyến mãi. Vui lòng thử lại.');
            }
          );
      }
      case CBOOKING.HOTEL: {
        // TODO push to hotel

        return this._hotelRepo
          .pushCounpon(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(params.couponCode);
            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật mã khuyến mãi. Vui lòng thử lại.');
            }
          );
      }
      case CBOOKING.TOUR: {
        // TODO push to tour

        return this._tourRepo
          .pushCounpon(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(params.couponCode);
            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật mã khuyến mãi. Vui lòng thử lại.');
            }
          );
      }

      case CBOOKING.PRODUCT: {
        // TODO push to tour

        return this._productRepo
          .applyCoupon(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(params.couponCode);
            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitCoupon(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật mã khuyến mãi. Vui lòng thử lại.');
            }
          );
      }
    }

    return;
  };

  // fn on callback submit coupon code
  onCallbackSubmitCoupon = (couponCode: string): void => {
    this.onGetSummaryPrice();

    this._state.notifyTo(EVENT.OPTIONAL_CHANGED, { couponCode });

    if (!!couponCode) {
      this._storage.setItem(CSTORAGE.PAYMENT_OFFER, {
        type: 'coupon',
        couponCode: couponCode
      });
    } else {
      this._storage.removeItem(CSTORAGE.PAYMENT_OFFER);
    }
  };

  // fn on submit reward point
  onSubmitRewardPoint = (params: any = {}): Promise<any> => {

    this._spinner.show('Đang cập nhật mã khuyến mãi. Vui lòng đợi trong giây lát. Cảm ơn!');
    switch (this.module) {
      default: {
        this._spinner.hide();
        break;
      }
      case CBOOKING.FLIGHT: {
        // TODO push to flight

        return this._ticketRepo
          .pushPoint(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(params.points);

            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi nhập sử dụng điểm thưởng. Vui lòng thử lại.');
            }
          );
      }
      case CBOOKING.HOTEL: {
        // TODO push to hotel

        return this._hotelRepo
          .pushPoint(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(params.points);

            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi nhập sử dụng điểm thưởng. Vui lòng thử lại.');
            }
          );

      }
      case CBOOKING.TOUR: {
        // TODO push to tour

        return this._tourRepo
          .pushPoint(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(params.points);

            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi nhập sử dụng điểm thưởng. Vui lòng thử lại.');
            }
          );
      }

      case CBOOKING.PRODUCT: {
        // TODO push to product

        return this._productRepo
          .applyPoint(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(params.points);

            }, (errors: Error[] = []) => {
              this._spinner.hide();
              this.onCallbackSubmitRewardPoint(null);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi nhập sử dụng điểm thưởng. Vui lòng thử lại.');
            }
          );
      }
    }

    return;
  };

  // fn callback submit reward point
  onCallbackSubmitRewardPoint = (point: number): void => {
    this.onGetSummaryPrice();

    this._state.notifyTo(EVENT.OPTIONAL_CHANGED, { point });

    if (!!point) {
      this._storage.setItem(CSTORAGE.PAYMENT_OFFER, {
        type: 'point',
        points: point
      });
    } else {
      this._storage.removeItem(CSTORAGE.PAYMENT_OFFER);
    }
  };

  // fn submit vat invoice - detect module
  onSubmitVATInvoice = (params?: any): Promise<any> => {

    this._spinner.show('Đang cập nhật thông tin. Vui lòng đợi trong giây lát. Cảm ơn');

    switch (this.module) {
      default: {
        this._spinner.hide();
        break;
      }
      case CBOOKING.FLIGHT: {
        // TODO push to flight

        return this._ticketRepo
          .pushVAT(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitVAT(this.params);
            },
            (errors: Error[] = []) => {
              this._spinner.hide();
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật thông tin hóa đơn. Vui lòng thử lại');
            });
      }
      case CBOOKING.HOTEL: {
        // TODO push to hotel

        return this._hotelRepo
          .pushVAT(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitVAT(this.params);
            },
            (errors: Error[] = []) => {
              this._spinner.hide();

              // remove when update addon
              this.onCallbackSubmitVAT(this.params);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật thông tin hóa đơn. Vui lòng thử lại');
            });
      }
      case CBOOKING.TOUR: {
        // TODO push to tour

        return this._tourRepo
          .pushVAT(params)
          .then(
            (res: any) => {
              this._spinner.hide();
              this.onCallbackSubmitVAT(this.params);
            },
            (errors: Error[] = []) => {
              this._spinner.hide();

              // remove when update addon
              this.onCallbackSubmitVAT(this.params);
              this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật thông tin hóa đơn. Vui lòng thử lại');
            });
      }
    }
    return;
  };

  // fn on callback submit vat info
  onCallbackSubmitVAT = (info: any = {}): void => {
    // this.onGetSummaryPrice();

    if (this.vatForm.value.isVAT && this.vatForm.valid) {
      this._storage.setItem(CSTORAGE.PAYMENT_VAT, this.vatForm.value);
    } else {
      this._storage.removeItem(CSTORAGE.PAYMENT_VAT);
    }
  };

  // fn get price summary of flight
  getFlightSummaryPrice = (): Promise<any> => {

    this._spinner.show('Đang cập nhật thông tin giá. Vui lòng đợi trong giây lat.');

    return this._ticketRepo
      .getBookingSummaryPrice({ requestId: this.requestId })
      .then(
        (res: any) => {

          this._spinner.hide();

          this.point = res.data.points;
          this.totalPrice = res.data.totalAmount;
          this.summaryPrice = res.data;
        },
        (errors: Error[] = []) => {

          this._spinner.hide();
          this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật lại giá. Vui lòng thử lại');
        }
      );
  };

  // fn get summary price of hotel
  getHotelSummaryPrice = (): Promise<any> => {
    this._spinner.show('Đang cập nhật thông tin giá. Vui lòng đợi trong giây lat.');

    return this._hotelRepo
      .getBookingSummaryPrice({ requestId: this.requestId })
      .then(
        (res: any) => {

          this._spinner.hide();

          this.point = res.data.points;
          this.totalPrice = _.sumBy(res.data.totalItems, 'price');
          this.summaryPrice = res.data;
        },
        (errors: Error[] = []) => {

          this._spinner.hide();
          this.onHandleError(errors, 'Đã có lỗi xãy ra khi cập nhật lại giá. Vui lòng thử lại');
        }
      );
  };

  // fn get summary price of tour
  async getTourSummaryPrice() {
    this._spinner.show('Đang cập nhật...');

    try {
      const res: any = await this._tourRepo.getBookingSummaryPrice({
        requestId: this.requestId
      });

      this._spinner.hide();

      this.point = res.data.points;
      this.summaryPrice = res.data;
      this.totalPrice = _.sumBy(res.data.totalItems, 'price');

    } catch (error) {
      this._spinner.hide();
      this.onHandleError(error, 'Đã có lỗi xãy ra khi cập nhật lại giá. Vui lòng thử lại');
    }

  };

  // fn get summary price of product
  async getProductSummaryPrice() {
    this._spinner.show('Đang cập nhật...');

    try {
      const res: any = await this._productRepo.getPriceSummary({
        requestId: this.requestId,
      });

      this._spinner.hide();

      this.point = res.data.points;
      this.summaryPrice = res.data;
      this.totalPrice = _.sumBy(res.data.totalItems, 'price');

    } catch (error) {
      this._spinner.hide();
      this.onHandleError(error, 'Đã có lỗi xãy ra khi cập nhật lại giá. Vui lòng thử lại');
    }

  };

}
