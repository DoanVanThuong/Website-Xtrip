import {Airport} from './airport.entity';
import {Photo} from './photo.entity';
import {Carrier} from './carrier.entity';

export class CheapFlight {

  destination: string = null;
  destinationAirport: Airport = null;
  month: number = null;
  origin: string = null;
  originAirport: Airport = null;
  photo: Photo = null;
  price: number = null;
  title: string = null;
  year: number = null;
  carrier: Carrier = null;

  points: number = 0;
  adaults: number = 0;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['carrier'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.originAirport) {
        this.originAirport = new Airport(data.originAirport);
      }

      if (!!data.destinationAirport) {
        this.destinationAirport = new Airport(data.destinationAirport);
      }

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.carrier) {
        this.carrier = new Carrier(data.carrier);
      }
    }
  }
}
