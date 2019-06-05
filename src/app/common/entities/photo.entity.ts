import * as _ from 'lodash';

export class Photo {

  name: string = '';
  description: string = '';
  order: number = 0;
  url: string = '';
  src: string = '';

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