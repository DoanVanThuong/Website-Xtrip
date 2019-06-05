import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../popup.base';
import {Transfer} from '../../../../common';

@Component({
  selector: 'pay-now',
  templateUrl: './pay-now.component.html',
  styleUrls: ['./pay-now.less'],

})

export class PaymentPayNowPopup extends PopupBase {
  @Input() data: any = null;
  @Output('confirm') confirm: EventEmitter<any> = new EventEmitter<any>();
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
