import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { PopupBase } from '../../popup.base';

@Component({
  selector: 'app-charge-fee-popup',
  templateUrl: './charge-fee.popup.html',
  styleUrls: ['./charge-fee.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ChargeFeePopupComponent extends PopupBase {

  @Input() data: any = {};
  @Output('onPay') onPay: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    super();
  }

  //on payment
  pay = () => {
    this.onPay.emit();
  }
}
