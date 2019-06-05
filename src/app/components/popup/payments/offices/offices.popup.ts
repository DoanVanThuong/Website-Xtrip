import {Component,  Input,  ViewEncapsulation} from '@angular/core';
import {Bank, Payment} from '../../../../common';
import {PopupBase} from '../../popup.base';

@Component({
  selector: 'office-popup',
  templateUrl: './offices.popup.html',
  styleUrls: ['./offices.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentOfficePopup extends PopupBase {

  @Input('method') payment: Payment = new Payment();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

}