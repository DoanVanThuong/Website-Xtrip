export class RullFare {

  carrier: string = '';
  carrierName: string = '';
  url: string = '';

  constructor(data?: {}) {
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