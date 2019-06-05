import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'payment-change-popup',
  templateUrl: 'payment-change.popup.html',
  styleUrls: ['./payment-change.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentChangePopup extends PopupBase {

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  // on accept
  onAccept = () => {
    this.hide();
    this.submit.emit();

    if (this.event.accept instanceof Function) {
      this.event.accept(this);
    }
  };

  // on cancel
  onCancel = () => {
    this.hide();

    if (this.event.cancel instanceof Function) {
      this.event.cancel(this);
    }
  };
}
