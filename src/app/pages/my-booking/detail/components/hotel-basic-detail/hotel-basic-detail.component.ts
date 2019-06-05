import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from '../../../../../app.base';
import { BOOKING_STATUS, PAYMENT_METHOD } from '../../../../../app.constants';
import { UtilityHelper } from '../../../../../common';

@Component({
  selector: 'app-booking-hotel-basic-detail',
  templateUrl: './hotel-basic-detail.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MyBookingHotelBasicDetail extends AppBase {

  STATUS: any = BOOKING_STATUS;
  METHOD: any = PAYMENT_METHOD;
  isExpired = false;

  @Input() hotel: any = {};
  @Input() mode: number = 0; //0: detail; 1: popup change payment
  @Input() currentPayment: string = '';

  constructor() {
    super();
  }

  //get text current payment status
  getTextPaymentStatus = (status: number = -1): string => {
    return this.utilityHelper.getPaymentStatusText(status);
  };

  // fn on expired to keep place
  onExpired = () => {
    this.isExpired = true;
  };

}
