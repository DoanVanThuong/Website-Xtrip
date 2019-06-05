import * as _ from "lodash";

export interface IHotelLocation {
  code: string;
  countryCode: string;
  countryName: string;
  destinationType: string;
  longitude: number;
  latitude: number;
  name: string;
}

export class HotelLocation {

  code: string = null;
  countryCode: string = null;
  countryName: string = null;
  destinationType: string = null;
  longitude: number = null;
  latitude: number = null;
  name: string = null;
  location: string = null;
  shortAddress: string = null;
  zoom: number = 15;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });
    }
  }

}
