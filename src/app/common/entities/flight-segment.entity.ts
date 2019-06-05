import {FlightBaggage} from "./baggage.entity";

export class FlightSegment {

  baggageDetails: FlightBaggage[];
  requestId: string;
  itineraryType: number;

  // custom fields
  baggages: FlightBaggage[] = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['baggageDetails'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // calculate day of week
      if (!!data.baggageDetails) {
        this.baggageDetails = data.baggageDetails.map(baggage => new FlightBaggage(baggage));
      }
    }
  }
}
