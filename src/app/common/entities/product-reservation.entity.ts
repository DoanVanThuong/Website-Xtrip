import {Photo} from './photo.entity';
import * as _ from 'lodash';
import {Passenger} from './passenger.entity';
import {Payment} from './payment.entity';

export class ProductReservation {

  id: string = '';
  bookingDate: string = '';
  code: string = '';
  departDate: string = '';
  duration: string = '';
  holdExpiry: string = '';
  isCancelled: boolean = false;
  isReviewable: boolean = false;
  isReviewed: boolean = false;
  pnr: string = '';
  productId: string = '';
  productName: string = '';
  productPhoto: Photo = new Photo();
  status: number = 0;
  totalPax: number = 0;
  totalPrice: number = 0;
  adults: number = 0;
  bookingOptions: any[] = [];
  cancellationPolicy: string = '';
  children: number = 0;
  contactName: string = '';
  infants: number = 0;
  notes: string = '';
  passengers: Passenger[] = [];
  paymentDetail: Payment = new Payment();
  paymentHelpUrl: string = '';
  priceSummary: any = {};
  productAddress: string = '';
  productOptionName: string = '';
  seniors: number = 0;
  timeslot: string = '';
  vouchers: string[] = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['productPhoto', 'passengers', 'bookingOptions', 'vouchers', 'paymentDetail'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // payment detail
      if (!!data.paymentDetail) {
        this.paymentDetail = new Payment(data.paymentDetail);
      }

      // product photo
      if (!!data.productPhoto) {
        this.productPhoto = new Photo(data.productPhoto);
      }

      // passengers
      if (!!data.passengers) {
        this.passengers = data.passengers;
      }

      // booking options
      if (!!data.bookingOptions) {
        this.bookingOptions = data.bookingOptions;
      }

      // vouchers
      if (!!data.vouchers) {
        this.vouchers = data.vouchers;
      }
    }
  }
}
