import * as _ from 'lodash';

export class BookingFlight {

  Adult: number = 1;
  Child: number = 0;
  Infant: number = 0;
  Segments: Array<any> = [];
  CouponCode: string = '';
  Points: number = 0;
  Contact: any = Object;
  Passengers: Array<any> = [];
  invoiced: boolean = false;
  vatInvoiceInfo: any = {};

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });
    }
  }
}