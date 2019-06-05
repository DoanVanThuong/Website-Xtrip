import * as moment from 'moment';
import {FlightLeg} from './flight-leg.entity';
import {UtilityHelper} from '../helpers';
import {Airline} from './airline.entity';

export class FlightReservationSegment {

  bookingCode: string = '';
  bookingTotalPrice: any = null;
  carrier: string = null;
  code: string = null;
  createdDate: string = null;
  departTime: string = null;
  destination: string = null;
  flightDuration: number = null;
  flightNumber: number = null;
  holdExpiry: string = null;
  id: string = null;
  isIssued: boolean = false;
  itineraryType: number = 0;
  landingTime: string = null;
  lastModified: string = null;
  legs: FlightLeg[] = [];
  origin: string = null;
  priceDetails: any = null;
  priceSummaries: any = null;
  source: string = null;
  statusCode: number = 0;
  ticketClass: string = null;
  ticketType: string = null;
  totalPrice: number = 0;
  conditions: Array<any> = [];

  // custom
  airline: Airline = new Airline();
  startTimeDayofWeek: number = 0;

  constructor(data?: any) {

    const util = new UtilityHelper();

    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['legs', 'airline'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // calculate day of week
      if (!!data.departTime) {
        this.startTimeDayofWeek = moment(data.departTime).day();
      }

      if (!!data.legs) {
        this.legs = [];

        for (let index = 0; index < data.legs.length; index++) {
          let leg = data.legs[index];

          leg.index = index;

          if (index < data.legs.length - 1) {
            leg.breakTime = util.convertTime(moment(data.legs[index + 1].departTime).diff(moment(leg.landingTime)) / (1000 * 60));
          }

          this.legs.push(new FlightLeg(leg));
        }
      }

      if (!!data.airline) {
        if (data.airline instanceof Airline) {
          this.airline = data.airline;
        } else {
          this.airline = new Airline(data.airline);
        }
      }
    }
  }

}
