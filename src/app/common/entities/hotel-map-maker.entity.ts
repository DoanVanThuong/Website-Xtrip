export class HotelMapMaker {

  data: any = {};
  lat: number = 0;
  lng: number = 0;
  price: number = 0;

  constructor(data: any = {}) {
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