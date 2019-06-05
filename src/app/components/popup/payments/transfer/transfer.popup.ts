import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {Bank, Payment, PaymentOption, PaymentRepo, Transfer} from '../../../../common';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'transfer-popup',
  templateUrl: './transfer-popup.component.html',
  styleUrls: ['./transfer-popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentTransferPopup extends PopupBase {

  @Input() data: any = null;
  @Input('method') payment: Payment = new Payment();
  @Input('option') bank: PaymentOption = new PaymentOption();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  bankDetail: Transfer = new Transfer();

  module: string = '';
  reservationCode: string = '';

  constructor(private _activatedRoute: ActivatedRoute,
              private _paymentRepo: PaymentRepo,
              private _toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.module = params.module;
      this.reservationCode = params.reservationCode;
    });
  }

  ngOnChanges() {
    if (!!this.bank.code) {
      this.getPaymentDetail(this.bank);
    }
  }

  // on select bank option
  selectBank = (bank: PaymentOption): void => {
    this.bank = new PaymentOption(bank);
    this.getPaymentDetail(bank);
  };

  onPayment = (): void => {
    this.select.emit(this.bank);
  };

  getPaymentDetail = (bank: Bank) => {

    return this._paymentRepo
      .getTransferDetail(this.module, this.reservationCode, {
        Method: this.payment.code,
        Gateway: this.payment.gateway,
        Option: bank.code
      })
      .then(
        (res: any) => {
          this.bankDetail = new Transfer(res.data);
        }
      );
  };

  onClipboardSuccess = (content: any) => {
    this._toastr.success(content, 'Thông báo', {
      positionClass: 'toast-top-right'
    });
  };
}