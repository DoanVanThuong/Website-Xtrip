export class HotelFilterOptions {

  sorts: Array<any> = [];
  prices: Array<any> = [];
  stars: Array<any> = [1, 2, 3, 4, 5];
  options: Array<any> = [];

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