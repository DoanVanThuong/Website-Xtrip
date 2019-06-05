import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {TourReservation, UtilityHelper} from '../../../../../common';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';

@Component({
  selector: 'app-booking-tour-basic-detail',
  templateUrl: './tour-basic-detail.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MyBookingTourBasicDetail extends AppBase {

  STATUS: any = BOOKING_STATUS;
  METHOD: any = PAYMENT_METHOD;
  isExpired = false;

  @Input() tour: TourReservation = new TourReservation();
  @Input('mode') mode: number = 0; //0: detail; 1: popup change payment
  @Input() currentPayment: string = '';

  @Output() submitPopup ?: EventEmitter<any> = new EventEmitter<any>();

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

  //show detail price popup
  showDetailPrice = () => {
    this.submitPopup.emit();
  }

}
