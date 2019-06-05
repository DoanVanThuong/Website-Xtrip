export class CancellationPolicy {

  chargedAmount: number = 0;
  chargedPercentage: number = 0;
  from: string = null;
  to: string = null;
  hotelAmount: number = 0;
  hotelCurrency: string = 'VND';

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

