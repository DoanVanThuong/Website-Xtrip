import * as _ from 'lodash';
import { Coupon } from './coupon.entity';

export class Promotion {

  fullName: string = '';
  quantity: number = 0;
  total: number = 0;
  list: any = [];

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

      if (!!data.list) {
        this.list = data.list.map(item => new Coupon(item));
      }

    }
  }
}