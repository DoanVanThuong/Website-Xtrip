import {Photo} from './photo.entity';

export class Airport {

  code: string = '';
  isDomestic: boolean = false;
  isFeatured: boolean = false;
  location: string = '';
  name: string = '';
  photo: Photo = null;
  shortLocation: string = '';
  weight: number = null;

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