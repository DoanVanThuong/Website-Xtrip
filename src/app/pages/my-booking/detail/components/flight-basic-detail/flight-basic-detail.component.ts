import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';
import {UtilityHelper} from '../../../../../common';

@Component({
  selector: 'app-booking-flight-basic-detail',
  templateUrl: './flight-basic-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MyBookingFlightBasicDetail extends AppBase {

  @Input() flight: any = {};
  @Input() airports: any = {};
  @Input() mode: number = 0; //0: detail; 1: popup change payment
  @Input() currentPayment: string = '';

  STATUS: any = BOOKING_STATUS;
  METHOD: any = PAYMENT_METHOD;

  isExpired = false;

  constructor() {
    super();
  }

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name') => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field || 'name');
  };

  //get text current payment status
  getTextPaymentStatus = (status: number = -1): string => {
    return this.utilityHelper.getPaymentStatusText(status);
  };

  // fn on expired to keep place
  onExpired = () => {
    this.isExpired = true;
  };

  // fn get pnr code
  getPNR = (pnr: string): string => {
    let code = '';
    pnr.split('|').map((item, index) => {
      code += item + (index < (pnr.split('|').length - 1) ? ' - ' : '');
    });
    return code;
  };

}
