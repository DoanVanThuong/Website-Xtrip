import * as _ from 'lodash';
import {Photo} from './photo.entity';

export class Supplier {

  address: string = '';
  code: string = '';
  logo: Photo = new Photo();
  name: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['logo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.logo) {
        this.logo = new Photo(data.logo);
      }
    }
  }
}
