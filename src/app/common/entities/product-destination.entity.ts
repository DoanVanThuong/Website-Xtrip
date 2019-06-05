import * as _ from 'lodash';

import { Photo } from './photo.entity';

export class ProductDestination {

  id: string = '';
  name: string = '';
  address: string = '';
  country: string = '';
  type: any = null;
  photo: any = new Photo();

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