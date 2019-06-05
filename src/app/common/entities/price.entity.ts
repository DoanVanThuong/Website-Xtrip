export class Price {

  code: string = '';
  description: string = '';
  passengerType: string = '';
  price: number = 0;
  quantity: number = 0;
  total: number = 0;

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