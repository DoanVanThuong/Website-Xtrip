import * as _ from 'lodash';
import {Photo} from './photo.entity';

export class Banner {

  photo: Photo = new Photo;
  alias: string = '';
  code: string = '';
  description: string = '';
  name: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

    }
  }
}
