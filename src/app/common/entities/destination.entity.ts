import {Photo} from './photo.entity';

export class Destination {

  id: string = '';
  name: string = '';
  address: string = '';
  type: string = '';
  photo: Photo = new Photo();
  code: string = '';

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {
      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (data.photo) {
        this.photo = new Photo(data.photo);
      }
    }
  }
}