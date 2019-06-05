import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {Bank, Payment} from '../../../../common';

@Component({
  selector: 'atm-popup',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.less'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentNapasPopup extends PopupBase {

  @Input('method') payment: Payment = new Payment();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

  keyword: string = '';

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }


  selectBank(bank: Bank) {
    this.confirm.emit(bank);
  }
}