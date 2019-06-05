import {Passenger} from './passenger.entity';
import {Payment} from './payment.entity';
import {Photo} from './photo.entity';
import {Supplier} from './supplier.entity';
import * as _ from 'lodash';
import { PaymentDeposit } from './payment-deposit.entity';

export class TourReservation {

  adults: number = 0;
  bookingDate: string = null;
  children: number = 0;
  code: string = null;
  contactName: string = null;
  contactPhone: string = null;
  departDate: string = null;
  departPlace: string = null;
  holdExpiry: string = null;
  infants: number = 0;
  isCancelled: boolean = false;
  isInternational: boolean = false;
  isReviewable: boolean = false;
  isReviewed: boolean = false;
  isDeposited: boolean = false;
  passengers: Passenger[] = [];
  paymentDetail: Payment = new Payment();
  paymentHelpUrl: string = null;
  payments: PaymentDeposit[] = [];
  paymentPending: boolean = false;
  photo: Photo = new Photo();
  pnr: string = null;
  priceSummary: any = null;
  status: number = 0;
  statusName: string = '';
  supplier: Supplier = new Supplier();
  totalPrice: number = 0;
  totalAmountPaid: number = 0;
  totalAmountUnPaid: number = 0;
  totalPercentPaid: number = 0;
  nextPayments: any = [];
  tourCode: string = null;
  tourName: string = null;
  tourJourney: string = null;
  days: number = 0;
  nights: number = 0;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['passengers', 'paymentDetail', 'supplier', 'photo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // passengers
      if (!!data.passengers) {
        this.passengers = data.passengers.map(passenger => new Passenger(passenger));
      }

      // supplier
      if (!!data.supplier) {
        this.supplier = new Supplier(data.supplier);
      }

      // supplier
      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      // payment detail
      if (!!data.paymentDetail) {
        this.paymentDetail = new Payment(data.paymentDetail);
      }

      // payments
      if (!!data.payments) {
        this.payments = data.payments.map(payments => new PaymentDeposit(payments));
      }

    }
  }

}