import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {Transfer} from '../../../../common';

@Component({
  selector: 'not-pay-now',
  templateUrl: './not-pay-now.component.html',
  styleUrls: ['./../pay-now/pay-now.less'],

})

export class PaymentNotPayNowPopup extends PopupBase {
  @Input() data: any = null;
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  dataTransfer: Transfer = null;
  heading: string = '';

  constructor() {
    super();
  }

  ngOnInit() {
  }

  // Confirm transfer
  confirmPaymentTransfer = () => {
    this.confirm.emit();
  };

  ngOnChanges() {
    if (!_.isNull(this.data)) {
      this.dataTransfer = new Transfer(this.data);
      this.heading = this.dataTransfer.bankName;
    }
  }
}
