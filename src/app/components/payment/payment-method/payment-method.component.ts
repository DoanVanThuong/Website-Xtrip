import {Component, EventEmitter, Input, Output, ViewEncapsulation, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

import {AppBase} from '../../../app.base';
import {Bank, Error, Payment, Transfer} from '../../../common/entities';
import {PaymentRepo} from '../../../common/repos';
import {PAYMENT_METHOD} from '../../../app.constants';
import {Spinner} from '../../../common/services';
import {isPlatformBrowser} from '@angular/common';
import {FormBuilder, FormGroup} from "@angular/forms";

declare var window: any;

@Component({
  selector: 'payment-method-box',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.less',],
  encapsulation: ViewEncapsulation.None
})
export class PaymentMethodComponent extends AppBase {

  @Input() methods: Array<any> = [];
  // @Input() contact: any = {};
  @Input() summaryPrice ?: any = {};
  @Input() moduleType ?: string = '';
  @Input() hideTitle ?: boolean = false;
  @Input() delay ?: number = 0; // milisecond

  @Output('select-method') select: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();

  METHOD: any = PAYMENT_METHOD;

  module: string = '';
  reservationCode: string = '';

  selectedPayment: any = new Payment();
  selectedBank: any = new Bank();
  payments: Payment[] = Array<Payment>();

  transferDetail: Transfer = null;
  isLoadPaymentDetail: boolean = false;

  contactForm: FormGroup;

  constructor(private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _fb: FormBuilder,
              private _paymentRepo: PaymentRepo,
              private _spinner: Spinner,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {
    combineLatest(
      this._activateRoute.params,
      this._activateRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((param: any): void => {

        this.module = !!param.module ? param.module : this.moduleType;
        this.reservationCode = !!param.reservationCode ? param.reservationCode : param.code;

        this.ngFormInit();

        if (isPlatformBrowser(this.platformId)) {
          window.setTimeout(this.getPayments, this.delay);
        }
      });
  }

  ngOnChanges() {
    if (!!this.summaryPrice) {
      if (isPlatformBrowser(this.platformId)) {
        window.setTimeout(this.getPayments, this.delay);
      }
    }
  };

  // fn form init
  ngFormInit = (): void => {
    this.contactForm = this._fb.group({});
  };

  // fn get method payments
  getPayments = () => {

    this._spinner.show('Đang tải thông tin');

    return this._paymentRepo
      .getPayments(this.module, this.reservationCode)
      .then((res: any) => {

        this._spinner.hide();
        this.payments = (res.data || []).map(item => new Payment(item));
        this.selectedPayment = this.payments[0];
        this.transferDetail = null;

        this.onSelectMethod();
      }, (errors: Array<Error> = []) => {

        this._spinner.hide();
        this._router.navigate(['/payment/result'], {
          queryParams: {module: this.module, errorMessage: errors[0].value}
        });
      });
  };

  // fn get payment detail
  getPaymentDetail = (bank: Bank) => {
    this.isLoadPaymentDetail = true;
    return this._paymentRepo
      .getTransferDetail(this.module, this.reservationCode, {
        Method: this.selectedPayment.code,
        Gateway: this.selectedPayment.gateway,
        Option: bank.code
      })
      .then(
        (res: any) => {
          this.transferDetail = new Transfer(res.data);
          this.isLoadPaymentDetail = false;
        }
      );
  };

  // fn on select payment method
  onSelectPaymentMethod = (payment: Payment): void => {
    if (this.selectedPayment.code === payment.code) {
      return;
    }

    this.selectedPayment = payment;
    this.selectedBank = new Bank(); // reset selected bank when chang method
    this.transferDetail = null;

    this.onSelectMethod();
  };

  // fn on selec bank in napas
  onSelectBank = (bank: Bank): void => {
    if (this.selectedBank.code === bank.code) {
      return;
    }

    this.selectedBank = bank;

    if (this.selectedPayment.code === PAYMENT_METHOD.TRANSFER) {
      this.getPaymentDetail(this.selectedBank);
    }

    this.onSelectMethod();
  };

  // fn on select method
  onSelectMethod = (): any => {
    this.select.emit({
      method: this.selectedPayment,
      option: this.selectedBank
    });
  };

  // on cod form change
  onCODChange = ($event: any): void => {
    this.contactForm = $event;
    this.changes.emit(this.contactForm);
  };

  // fn show detail with
  showWith = (code: string = '', checklist: any[] = [PAYMENT_METHOD.OFFICE, PAYMENT_METHOD.ATM]): boolean => {

    // if (this.utilityHelper.isNullOrUndefined(checklist) || !checklist.length) {
    //   checklist = [PAYMENT_METHOD.OFFICE, PAYMENT_METHOD.ATM];
    // }

    return Boolean(_.find(checklist, (item: any) => code === item));
  };
}
