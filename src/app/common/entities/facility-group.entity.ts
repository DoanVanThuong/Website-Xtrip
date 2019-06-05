import {Facility} from './facility.entity';
import {Photo} from './photo.entity';

export class FacilityGroup {

  facilities: Facility[] = [];
  name: string = null;
  type: number = null;
  imagePath: string = null;
  imageHost: string = null;
  photo: Photo = new Photo();

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['facilities'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.facilities) {
        this.facilities = data.facilities.map(item => new Facility(item));
      }

      this.photo = new Photo({
        src: this.imageHost + this.imagePath,
        name: this.name
      });
    }
  }
}