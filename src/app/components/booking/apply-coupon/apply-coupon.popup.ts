import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {PopupBase} from '../../popup/index';

@Component({
  selector: 'apply-coupon-popup',
  templateUrl: './apply-coupon.popup.html',
  styleUrls: ['./apply-coupon.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyCouponPopup extends PopupBase {

  couponCode: string = '';

  @Input() error: Array<any> = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  errorMessage: string = '';

  constructor() {
    super();
  }

  ngOnInit() {
    this.couponCode = '';
  }

  ngOnChanges() {
    if (this.error.length) {
      this.errorMessage = this.error[0].value;
    } else {
      this.errorMessage = '';
      this.hide();
    }
  }

  // submit coupon
  onSubmit() {
    this.submit.emit(this.couponCode);
  }

  // fn on cancel
  onCancel() {
    this.couponCode = '';
    this.hide();
  }


}
