import {Photo} from './photo.entity';
import {Hotel} from './hotel.entity';
import {Supplier} from './supplier.entity';
import * as moment from "moment";

export class TourPropose {

  id: string = null;
  code: string = null;
  name: string = null;
  priceFrom: number = 0;
  photo: Photo = new Photo();
  photoDesktop: Photo = new Photo();
  type: string = null;
  listTour: string[] = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo', 'photoDesktop'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.photoDesktop) {
        this.photoDesktop = new Photo(data.photoDesktop);
      }
    }
  }
}
