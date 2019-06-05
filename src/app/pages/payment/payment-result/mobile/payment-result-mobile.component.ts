import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';

import {AppBase} from '../../../../app.base';
import {StorageService, XPayment, PaymentRepo, DeviceService} from '../../../../common';
import {CSTORAGE, PAYMENT_METHOD, BOOKING_MODULE} from '../../../../app.constants';

import {Md5} from 'ts-md5/dist/md5';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';
import {PaymentVerify} from 'app/common/entities/payment-verify.entity';
import { ToastrService } from 'ngx-toastr';

const SecureHash = '198BE3F2E8C75A53F38C1C4A5B6DBA17';

@Component({
  selector: 'app-payment-result-mobile',
  templateUrl: './payment-result-mobile.component.html',
  styleUrls: ['./payment-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentResultMobileComponent extends AppBase {

  constructor(public activatedRoute: ActivatedRoute,
              private _router: Router,
              private _storage: StorageService,
              protected _toastr: ToastrService,
              private _paymentRepo: PaymentRepo,
              private _device: DeviceService) {
    super();
    this.setDeviceMode(_device);
  }

  src: string = '';

  METHOD: any = PAYMENT_METHOD;

  ReservationCode: string = '';
  orderCode: string = '';

  qrcode: string = '';
  xpay_SecureHash: string = '';
  dataHash: string = '';
  resultHash: any = null;
  module: string = '';

  routeParams: any;
  paymentType: string = '';

  paymentExpired: string = '';
  url: string = '';
  isRedirect: boolean = false;
  isError: boolean = false;
  paramsSubscription: Subscription;

  XPay: XPayment = new XPayment();

  verifyPayment: PaymentVerify = new PaymentVerify();

  ngOnInit() {

    this.getReservationCode();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.routeParams = params;
    });

    // get next route
    this.paramsSubscription = this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    });
  }

  ngOnDestroy(): void {

    // if ((this.url.includes('payment') || this.url.includes('my-booking')) && !this.isError && !this.isRedirect) {
    if (this.url.includes('payment') && !this.isError && this.isMobile) {

      this._storage.removeItem(CSTORAGE.RESERVATION_CODE);
      this.paramsSubscription.unsubscribe();
      this._router.navigate(['/home']);
    }

    this._storage.removeItem(CSTORAGE.PAYMENT_INFO);
  };

  //fn get reservation code
  getReservationCode() {

    const method = this._storage.getItem(CSTORAGE.PAYMENT_METHOD) || null;

    switch (method) {
      case PAYMENT_METHOD.OZD: {
        this.paymentType = PAYMENT_METHOD.OZD;
        this.getPayment();

        break;
      }
      case PAYMENT_METHOD.ATM:
      case PAYMENT_METHOD.VISA: {
        this.paymentType = PAYMENT_METHOD.CYBER;

        this.activatedRoute
          .queryParams
          .subscribe((params) => {

            this.XPay = new XPayment(params);

            let hashString: string = SecureHash;
            _.each(params, (value, key) => {
              if (key !== 'xpay_SecureHash') {
                hashString += (value + '').replace(/\+/g, ' ');
              }
            });

            if ((this.XPay.xpay_SecureHash || '').toLowerCase() == Md5.hashStr(hashString)
              && Number(this.XPay.xpay_ResponseCode) === 0) {
              // payment successfully
              this.ReservationCode = this.XPay.xpay_Order;
              this.module = this.XPay.xpay_Module;
              this.verifyBooking(this.ReservationCode, this.module);
            }
            else if(this.XPay.xpay_Type.toLowerCase() === 'cancel' || Number(this.XPay.xpay_ResponseCode) == 37) {
              this._toastr.error('Giao dịch của bạn chưa hoàn tất' || this.XPay.xpay_Message, '', {timeOut: this.isMobile ? 3000 : 5000, positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'});
              this.onRepayment(this.XPay.xpay_Order, this.XPay.xpay_Module)
            } else {
              // payment failed
              this.isError = true;
            }
          });

        break;
      }
      case PAYMENT_METHOD.STORE: {
        this.paymentType = PAYMENT_METHOD.STORE;
        this.getPayment();

        break;
      }
      case PAYMENT_METHOD.OFFICE: {
        this.paymentType = PAYMENT_METHOD.OFFICE;
        this.getPayment();

        break;
      }
      case PAYMENT_METHOD.TRANSFER: {
        this.paymentType = PAYMENT_METHOD.TRANSFER;
        this.getPayment();

        break;
      }
      case PAYMENT_METHOD.COD: {
        this.paymentType = PAYMENT_METHOD.COD;
        this.getPayment();

        break;
      }

      default: {
        this.isError = true;
        break;
      }
    }
  }

  //fn get respont payment
  getPayment() {
    const payment = this._storage.getItem(CSTORAGE.PAYMENT_INFO);
    if (!!payment) {
      this.ReservationCode = payment.bookingCode || '';
      this.paymentExpired = payment.paymentExpired || '';
      this.orderCode = this.ReservationCode = payment.orderCode || '';
      this.module = (payment.module || '').toLowerCase();
      // last verify
      this.verifyBooking(this.ReservationCode, this.module);
    }
    else {
      this.isError = true;
    }
  }

  // fn back to home
  backToHome() {
    this._router.navigate(['/']);
    this._storage.removeItem(this.CSTORAGE.CONTACT_INFO);
  }

  //fn go to my booking
  gotoMyBooking = (): void => {
    this._router.navigate([`/my-booking/${this.module}/${this.orderCode || this.ReservationCode}`]);
    this._storage.removeItem(this.CSTORAGE.CONTACT_INFO);
    this.isRedirect = true;
  };

  //fn verify booking
  async verifyBooking(code: string, module: string) {
    try {
      const response: any = await this._paymentRepo.verifyBooking(code, module);

      this.isError = false;

      this.verifyPayment = new PaymentVerify(response.data);

      // this.prnCode = !!response.data.pnr ? response.data.pnr : response.data.bookingCode;
      // this.orderCode = response.data.orderCode;
      // //detect payoo
      // if (response.data.gateway.toLowerCase() === 'payoo') {
      //   this.ReservationCode = response.data.transactionNo;
      // };


    } catch (error) {
      this.isError = true;
    }
  }

  //fn check repayment
  checkRePayment() {
    const method = this._storage.getItem(CSTORAGE.PAYMENT_METHOD) || null;
    switch (method) {
      case PAYMENT_METHOD.ATM:
      case PAYMENT_METHOD.VISA: {
        this.ReservationCode = this.XPay.xpay_Order;
        this.module = this.XPay.xpay_Module;
        this.onRepayment(this.ReservationCode, this.module);
        break;
      }
      case PAYMENT_METHOD.OZD:
      case PAYMENT_METHOD.STORE:
      case PAYMENT_METHOD.OFFICE:
      case PAYMENT_METHOD.TRANSFER:
      case PAYMENT_METHOD.COD:
      {
        this.getRePayData();
        break;
      }
      default: {
        this._router.navigate(['/']);
        break;
      }
    }
  }

  getRePayData() {
    if (!!this.routeParams) {
      this.ReservationCode = this.routeParams.reservationCode;
      this.module = (this.routeParams.module || '').toLowerCase();
    }
    this.onRepayment(this.ReservationCode, this.module);
  }

  onRepayment(code: string, module: string) {
    if(!!code && !!module) {
      this._router.navigate(['/payment'], {queryParams: {
        reservationCode: code,
        module: module
      }});
    }
    else {
      this._router.navigate(['/']);
    }
  }

}
