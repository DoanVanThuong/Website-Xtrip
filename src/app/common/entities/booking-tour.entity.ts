import * as _ from 'lodash';
import {Passenger} from './passenger.entity';

export class BookingTour {

  passengers: Array<Passenger> = [];
  code: string = '';
  alias: string = '';
  requestId: string = '';
  departDate: string = '';
  adults: number = 0;
  children: number = 0;
  infants: number = 0;
  contact: any = Object;
  couponCode: string = '';
  points: number = 0;
  isInternational: boolean = false;
  invoiced: boolean = false;
  vatInvoiceInfo: any = Object;
  rangeAdult: {
    from: number,
    to: number
  } = {
    from: 12,
    to: 100
  };
  rangeChildren: {
    from: number,
    to: number
  } = {
    from: 2,
    to: 12
  };
  rangeInfant: {
    from: number,
    to: number
  } = {
    from: 0,
    to: 2
  };

  isAdditionalInfo: boolean = true;

  depositCode: string = '';

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
