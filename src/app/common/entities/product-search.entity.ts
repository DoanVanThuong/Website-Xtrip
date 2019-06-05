import * as _ from 'lodash';
import { ProductDestination } from './product-destination.entity';

export class ProductSearch {

  type: string = 'all';
  sortIndex: number = 0;
  destination: ProductDestination = new ProductDestination();
  filters: any[] = [];

  // custom field
  name: string = '';
  country: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['destination'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });

      if (!!data.destination) {
        this.destination = new ProductDestination(data.destination);
      }

    }
  }
}