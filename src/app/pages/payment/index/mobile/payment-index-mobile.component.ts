import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {AppBase} from '../../../../app.base';
import {
  PaymentTransferPopup,
  PaymentStorePopup,
  PaymentOfficePopup,
  PaymentNapasPopup,
  PaymentCODPopup,
  ConfirmBackPopup,
  ChargeFeePopupComponent
} from '../../../../components/popup';
import {PAYMENT_METHOD, CSTORAGE} from '../../../../app.constants';
import {
  StorageService,
  Spinner,
  Security,
  PaymentRepo,
  AuthRepo,
  Bank,
  Transfer,
  Payment,
  User,
  Error,
  HotelRepo, TourRepo, PlaneTicketRepo, PaymentOption, ProductRepo, DeviceService
} from '../../../../common';
import {ToastrService} from 'ngx-toastr';
import {GlobalState} from '../../../../global.state';
import {FormBuilder, FormGroup} from '@angular/forms';

const PAYMENT_RESPONSE_TYPE: any = {
  URL: 'url',
  JSON: 'json'
};

@Component({
  selector: 'app-payment-index-mobile',
  templateUrl: './payment-index-mobile.component.html',
  styleUrls: ['./payment-index-mobile.component.less',],
  encapsulation: ViewEncapsulation.None
})
export class PaymentIndexMobileComponent extends AppBase {

  //config modal
  @ViewChild(PaymentTransferPopup) transferPopup: PaymentTransferPopup;
  @ViewChild(PaymentStorePopup) storePopup: PaymentStorePopup;
  @ViewChild(PaymentOfficePopup) officesPopup: PaymentOfficePopup;
  @ViewChild(PaymentNapasPopup) atmPopup: PaymentNapasPopup;
  @ViewChild(PaymentCODPopup) codPopup: PaymentCODPopup;
  @ViewChild(ConfirmBackPopup) confirmBackPopup: ConfirmBackPopup;
  @ViewChild(ChargeFeePopupComponent) chargeFeePopupComponent: ChargeFeePopupComponent;

  messageConfirm: string = 'Giao dịch của bạn chưa hoàn tất. Bạn có thật sự muốn quay lại Trang chủ ?';
  params: any = {
    module: '',
    reservationCode: ''
  };

  METHOD: any = PAYMENT_METHOD;

  contactForm: FormGroup;
  selectedOption: PaymentOption = new PaymentOption();
  selectedPayment: Payment = new Payment();

  reservationCode: string = '';
  module: string = '';

  payments: Payment[] = new Array<Payment>(); //Thanh toán

  contact: any = {FullName: '', MobileNumber: '', Address: '', Note: ''};

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

  dataTransfer: Transfer;

  url: string = '';

  profile: User = new User();
  navigationSubscription: any = null;

  constructor(protected _spinner: Spinner,
              protected _router: Router,
              protected _fb: FormBuilder,
              protected _activatedRoute: ActivatedRoute,
              protected _paymentRepo: PaymentRepo,
              protected _state: GlobalState,
              protected _toastr: ToastrService,
              protected _storage: StorageService,
              protected _ticketRepo: PlaneTicketRepo,
              protected _hotelRepo: HotelRepo,
              protected _tourRepo: TourRepo,
              protected _productRepo: ProductRepo,
              private _authRepo: AuthRepo,
              private _device: DeviceService,
              private _security: Security) {

    super();
    this.setDeviceMode(_device);
  }

  ngOnInit() {

    //
    if (this._security.isAuthenticated()) {
      this.profile = this._security.getCurrentUser();
      this.getPoints();
    }

    this._activatedRoute
      .queryParams
      .subscribe(params => {

        this.reservationCode = params.reservationCode || '';
        this.module = params.module || '';

        if (this.utilityHelper.isNullOrUndefined(this.reservationCode)) {
          this._router.navigate(['/']);
        } else {
          this.getPaymentMethods(this.module, this.reservationCode);
        }
      });

    this.ngFormInit();
  }

  ngAfterViewInit() {
    this.navigationSubscription = this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

        this.url = event.url;

        // detect url
        if (this.url !== '/' && !this.url.includes('result')) {
          this._state.notifyDataChanged('valid-url', false);

          this.confirmBackPopup.show({
            backdrop: 'static',
          });
        } else {
          this._state.notifyDataChanged('valid-url', true);
        }
      }
    });
  }

  ngOnDestroy() {

    this._storage.removeItem(CSTORAGE.PAYMENT_OFFER);
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngFormInit = (): void => {
    this.contactForm = this._fb.group({});
  };

  //get list payment (input: module name: tour, hotel, flight, reservation code)
  getPaymentMethods = (module: string = '', code: string = ''): Promise<any> => {

    this._spinner.show('Vui lòng đợi trong giây lát');

    return this._paymentRepo
      .getPayments(this.module, this.reservationCode)
      .then(
        (res: any) => {
          this._spinner.hide();
          this.payments = (res.data || []).map(item => new Payment(item));
          this.selectedPayment = this.payments[0];
        },
        (errors: Error[] = []) => {
          this._spinner.hide();
          this._router.navigate(['/payment/result'], {
            queryParams: {module: this.module, errorMessage: errors[0].value}
          });
          this._state.notifyDataChanged('valid-url', true);
        });
  };

  //fn select payment type
  selectPayment = (payment: Payment): void => {
    if (this.selectedPayment.code !== payment.code) {
      this.selectedOption = new PaymentOption();
      this.selectedPayment = payment;
    }

    switch (this.selectedPayment.code) {
      case PAYMENT_METHOD.TRANSFER: {
        if (!this.selectedOption.code) {
          this.selectedOption = this.selectedPayment.options[0];
        }
        break;
      }
      /*case PAYMENT_METHOD.STORE: {
        this.storePopup.show();
        break;
      }*/
      /*case PAYMENT_METHOD.OFFICE: {
        this.officesPopup.show();
        break;
      }*/
    }
  };

  // dn set payment Data
  setPaymentData = (Gateway: any = '', Method: any = '', Option: any) => {
    this.method = {Gateway, Method, Option};
  };

  // fn set payment data cod
  setPaymentCOD = (Gateway: any = '', Method: any = '', Contact: any = {}) => {
    this.methodCOD = {Gateway, Method, Contact};
  };

  // fn submit selecte method payment
  onPaymentSubmit = () => {
    switch (this.selectedPayment.code) {
      default: {
        this.onPayment();
        break;
      }
      case PAYMENT_METHOD.TRANSFER: {
        this.transferPopup.show();
        break;
      }
      case PAYMENT_METHOD.ATM: {
        this.atmPopup.show();
        break;
      }
      case PAYMENT_METHOD.COD: {
        this.codPopup.show();
        break;
      }
    }
  };

  // fn payment
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

    this._spinner.show('Vui lòng đợi trong giây lát.');

    return this._paymentRepo
      .postPayment(this.module, this.reservationCode, params)
      .then(
        (res: any) => {
          this._spinner.hide();
          this._storage.removeItem(CSTORAGE.PAYMENT_OFFER);
          this._storage.removeItem(CSTORAGE.PAYMENT_VAT);
          this._storage.setItem(CSTORAGE.PAYMENT_METHOD, this.selectedPayment.code);

          this.onHandlePaymentResponse(res);
        },
        (errors: Error[] = []) => {
          this._spinner.hide();
          this._toastr.error('Giao dịch của bạn chưa hoàn tất' || errors[0].value, '', {
            timeOut: this.isMobile ? 3000 : 5000,
            positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width'
          })
          // this._router.navigate(['/payment'], {
          //   queryParams: {module: this.module, reservationCode: this.reservationCode}
          // });
        });
  };

  // fn on on select options
  onSelectOption = (option: any): void => {
    this.selectedOption = option;

    /*if (this.selectedPayment.code === PAYMENT_METHOD.TRANSFER) {
      this.selectedTransfer(option);
    }*/

    this.onPayment();
  };

  //fn confirm payment COD
  onSubmitCOD = ($event: any): any => {
    this.contactForm = $event;
    this.onPayment();
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
          queryParams: {module: this.module}
        });
      }
    }
  };

  //fn confirm payment transfer
  confirmPaymentTransfer() {
    this.onPayment();
  }

  //fn show confirm back
  onConfirm = () => {
    this.confirmBackPopup.show({
      backdrop: 'static'
    });
  };

  //fn confirm back
  onConfirmBack = (e: any) => {
    if (e) {
      //this._router.navigate(['/']);
      this._router.navigate(['payment/result'], {
        queryParams: {
          errorMessage: 'Giao dịch chưa hoàn tất'
        }
      })
    } else {
      this._state.notifyDataChanged('valid-url', true);
    }
  };

  //get points
  getPoints() {
    return this._authRepo
      .getRewardPoints(this.offset, this.limit)
      .then(
        (res: any) => {
          this.profile.rewardPoints.available = res.rewardPoints.available || 0;
          this.profile.points = this.profile.rewardPoints.available;
        },
        (errors: any) => {
          this.profile.rewardPoints.available = 0;
        }
      );
  }

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

  // fn open payment detail
  onOpenPaymentDetail = (): void => {
    switch (this.selectedPayment.code) {
      case PAYMENT_METHOD.OFFICE: {
        this.officesPopup.show();
        break;
      }
      case PAYMENT_METHOD.STORE: {
        this.storePopup.show();
        break;
      }
      case PAYMENT_METHOD.ATM: {
        this.atmPopup.show();
        break;
      }
    }
  };

  //chare fee on open popup
  onOpenChargeFeePopup() {
    this.chargeFeePopupComponent.show();
  }

}
