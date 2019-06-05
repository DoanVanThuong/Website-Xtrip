import {Photo} from './photo.entity';

export class Facility {

  code: string = '';
  imageHost: string = '';
  imagePath: string = '';
  name: string = '';
  photo: Photo = new Photo();

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

      // this.photo = new Photo({
      //   src: this.imageHost + this.imagePath,
      //   name: this.name
      // });
    }
  }
}
