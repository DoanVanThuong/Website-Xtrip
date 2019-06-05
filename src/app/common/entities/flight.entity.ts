import * as moment from 'moment';
import {FlightLeg} from './flight-leg.entity';
import {Price} from './price.entity';
import {RullFare} from './rule-fare.entity';
import {UtilityHelper} from '../helpers';

export class Flight {

  id: string = null;
  title: string = '';
  adults: number = 0;
  baggageAllowance: any = null;
  carrier: string = '';
  children: number = 0;
  classCode: string = '';
  coupleId: number = 0;
  coupleTotal: number = null;
  coupleValue: number = null;
  departTime: string = '';
  description: string = '';
  destination: string = '';
  directionCode: number = 0;
  directionName: string = '';
  fareBasis: any = null;
  flightDuration: number = 0;
  flightNumber: string = '';
  groupValue: string = '';
  infants: number = 0;
  isCoupled: boolean = false;
  isInternational: boolean = false;
  landingTime: string = '';
  legs: Array<FlightLeg> = [];
  origin: string = '';
  originalValue: string = '';
  points: number = 0;
  price: number = 0;
  priceDetails: Array<Price> = [];
  priceSummaries: Array<Price> = [];
  ruleFares: Array<RullFare> = [];
  selectedValue: string = '';
  source: string = '';
  stops: number = 0;
  ticketType: string = '';
  totalPrice: number = 0;
  month: number = 0;
  year: number = 0;
  conditions: Array<any> = [];

  // customize
  airports: Array<any> = [];
  startTimeDayofWeek: number = 0;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['conditions'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // calculate day of week
      if (!!data.departTime) {
        this.startTimeDayofWeek = moment(data.departTime).day();
      }

      /*if (!!data.legs) {
        this.legs = data.legs.map((leg, index) => {
          if (index < (data.legs.length - 1)) {
            leg.breakTime = UtilityHelper.convertTime(moment(data.legs[index + 1].departTime).diff(moment(leg.landingTime)) / (1000 * 60));
          }

          return new FlightLeg(leg);
        });
      }*/

      if (!!data.conditions) {
        this.conditions = data.conditions;
      }
    }
  }
}