export class Bank {

  code: string = '';
  icon: string = '';
  name: string = '';
  sub: string = '';

  // customize
  photo: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });
    }
  }

}

export class PaymentOption {
  code: string = '';
  icon: string = '';
  name: string = '';
  sub: string = '';

  // customize
  photo: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });
    }
  }
}