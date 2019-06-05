export class HotelDestination {

  code: string = '';
  name: string = '';
  countryCode: string = '';
  countryName: string = '';
  destinationType: string = '';
  longitude: number = 0;
  latitude: number = 0;
  numberOfHotels: number = 0;
  zoom: number = 15;

  constructor(data: any = {}) {
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