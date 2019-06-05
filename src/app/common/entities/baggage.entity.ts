import {Photo} from "./photo.entity";

export class FlightBaggage {

  carrier: string = null;
  flightNumber: string = null;
  icon: string = null;
  id: string = null;
  price: number = 0;
  unit: string = 'kg'
  weight: number = 0;

  photo: Photo = new Photo();

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
