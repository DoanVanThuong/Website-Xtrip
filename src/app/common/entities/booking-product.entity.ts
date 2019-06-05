import * as _ from 'lodash';
import {Passenger} from './passenger.entity';

export class BookingProduct {

  requestId: string = '';
  contact: any = {};
  message: string = '';
  points: number = 0;
  couponCode: string = '';
  passengers: any[] = [];

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

  setContact = (contact: any) => {
    this.contact = contact;
  };

  setMessage = (message: string = '') => {
    this.message = message;
  };
}