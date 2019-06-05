import {FlightReservationSegment} from './flight-reservation-segment.entity';
import {User} from './user.entity';
import {Passenger} from './passenger.entity';
import {Payment} from './payment.entity';

export class FlightReservation {

  code: string = null;
  segments: FlightReservationSegment[] = [];
  bookingDate: string = null;
  adult: number = 0;
  child: number = 0;
  infant: number = 0;
  basicPriceSummaries: any[] = [];
  contact: User = null;
  holdExpiry: string = null;
  passengers: Passenger[] = [];
  paymentDetail: Payment = new Payment();
  paymentHelpUrl: string = null;
  pnr: string = null;
  status: number = -1;
  totalPrice: number = 0;
  isInternational: boolean = false;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['segments', 'paymentDetail'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // flight segment
      if (!!data.segments) {
        this.segments = data.segments.map(segment => new FlightReservationSegment(segment));
      }

      // payment detail
      if (!!data.paymentDetail) {
        this.paymentDetail = new Payment(data.paymentDetail);
      }
    }
  }

}
