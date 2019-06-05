import {Component, ViewEncapsulation, Input, EventEmitter, Output} from '@angular/core';
import {PopupBase} from '../../../../components/popup';
import {PAYMENT_METHOD, BOOKING_STATUS, BOOKING_MODULE, CBOOKING, CSTORAGE} from '../../../../app.constants';
import {StorageService, PaymentOption, Payment, Spinner, PaymentRepo, Error} from '../../../../common/index';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

const PAYMENT_RESPONSE_TYPE: any = {
  URL: 'url',
  JSON: 'json'
};

@Component({
  selector: 'app-change-payment-popup',
  templateUrl: './method-change-payment.popup.html',
  styleUrls: [
    './method-change-payment.popup.less',
    '../../../payment/payment-result/desktop/payment-result-desktop.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChangePaymentMethodPopup extends PopupBase {

  STATUS: any = BOOKING_STATUS;
  METHOD: any = PAYMENT_METHOD;
  MODULE: any = BOOKING_MODULE;

  selectedOption: PaymentOption = new PaymentOption();
  selectedPayment: Payment = new Payment();

  method: any = {
    Gateway: '',
    Method: '',
    Option: ''
  };

  methodCOD: any = {
    Gateway: '',
    Method: '',
    Contact: null
  };

  contactForm: FormGroup;

  @Input() module: string = '';
  @Input() reservationCode: string = '';
  @Input() airports: any = {};
  @Input() data: any = {};

  constructor(protected _fb: FormBuilder,
              protected _storage: StorageService,
              protected _toastr: ToastrService,
              protected _spinner: Spinner,
              protected _paymentRepo: PaymentRepo,
              protected _router: Router) {
    super();
  }

  onInit = (): void => {

  };

  ngOnInit() {
    this.onFormInit();
  }

  // fn form initial
  onFormInit = () => {
    this.contactForm = this._fb.group({});
  };

  // fn on select payment method
  onSelectPaymentMethod = ($event: any) => {

    this.selectedPayment = $event.method;
    this.selectedOption = $event.option;
  };

  // fn detect disabled submit
  detectDisableSubmit = (): boolean => {

    if (!this.utilityHelper.isNullOrUndefined(this.selectedPayment)
      && !this.utilityHelper.isNullOrUndefined(this.selectedPayment.code)) {

      switch (this.selectedPayment.code) {
        case PAYMENT_METHOD.TRANSFER:
        case PAYMENT_METHOD.ATM: {
          return !(!this.utilityHelper.isNullOrUndefined(this.selectedOption) && !this.utilityHelper.isNullOrUndefined(this.selectedOption.code));
        }
        case PAYMENT_METHOD.COD: {
          return this.contactForm.invalid;
        }
        default: {
          return false;
        }
      }
    }

    return true;
  };

  //fn payment
  onPayment = ($event: any = null): Promise<any> => {
    if (this.utilityHelper.isNullOrUndefined(this.selectedPayment)) {
      return;
    }

    let params = {};

    switch (this.selectedPayment.code) {
      case PAYMENT_METHOD.COD: {
        this.setPaymentCOD(this.selectedPayment.gateway, this.selectedPayment.code, this.contactForm.value);
        params = this.methodCOD;
        break;
      }
      default: {
        this.setPaymentData(this.selectedPayment.gateway, this.selectedPayment.code, this.selectedOption.code);
        params = this.method;
        break;
      }
    }

    this._spinner.show('Vui lòng đợi trong giây lát');

    return this._paymentRepo
      .postPayment(this.module, this.reservationCode, params)
      .then(
        (res: any) => {
          this._spinner.hide();
          this._storage.removeItem(CSTORAGE.PAYMENT_OFFER);
          this._storage.removeItem(CSTORAGE.PAYMENT_VAT);
          this._storage.setItem(CSTORAGE.PAYMENT_METHOD, this.selectedPayment.code);
          this.onHandlePaymentResponse(res);
        }
      ).catch((errors: Error[] = []) => {
        this.onHandleError(errors, 'Thanh toán thất bại. Vui lòng thử lại');
        this._spinner.hide();
      });
  };

  // fn on update COD
  onUpdateCOD = ($event: any) => {
    this.contactForm = $event;
  };

  // fn set payment data cod
  setPaymentCOD = (Gateway: any = '', Method: any = '', Contact: any = {}) => {
    this.methodCOD = {Gateway, Method, Contact};
  };

  // dn set payment Data
  setPaymentData = (Gateway: any = '', Method: any = '', Option: any) => {
    this.method = {Gateway, Method, Option};
  };

  // fn handle error message
  onHandleError = (errors: Error[] = [], message: string = '', callback: Function = null): void => {

    if (errors.length) {
      message = errors[0].value || message;
    }

    this._toastr.error(message, 'Lỗi', {
      positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
    });

    if (!!callback && callback instanceof Function) {
      callback();
    }
  };

  // fn onPayment
  onHandlePaymentResponse = (data: any) => {

    const res = data;

    switch (res.data.verify) {
      case PAYMENT_RESPONSE_TYPE.URL: {
        window.location.href = res.data.payment;
        break;
      }
      case PAYMENT_RESPONSE_TYPE.JSON: {
        this._storage.setItem(CSTORAGE.PAYMENT_INFO, res.data.payment);

        this._router.navigate(['/payment/result'], {
          queryParams: {module: this.module, mode: 'change-method'}
        });
      }
    }
  };

}
