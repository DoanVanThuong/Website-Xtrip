import * as _ from 'lodash';

export class Coupon {

  code: string = '';
  count: number = 0;
  currency: string = 'VND';
  discount: number = 0;
  isPercent: boolean = false;
  maxDiscount: number = 0;
  name: string = '';
  summary: string = '';
  time: string = '';
  type: number = -1;
  rules: Array<string> = [];
  services: Array<any> = [];
  minOrderAmount: number = 0;

  // custom fields
  color: string = '';

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

      switch (data.type) {
        case 0: {
          this.color = 'yellow';
          break;
        }
        case 1: {
          this.color = 'green';
          break;
        }
        default: {
          this.color = 'blue';
          break;
        }
      }
    }
  }
}