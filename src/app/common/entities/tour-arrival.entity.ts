import {Photo} from './photo.entity';
import * as _ from "lodash";

export class TourArrival {

  alias: string = '';
  code: string = '';
  name: string = '';
  description: string = 'for test';
  photo: Photo = new Photo();
  price: number = 1000000;
  type: string = '';

  href: string = '';

  constructor(data?: any) {
    let self = this;

    let keys = ['photo'];

    _.each(data, function (val, key) {
      if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
        self[key] = val;
      }
    });

    if (!this.photo) {
      this.photo = new Photo();
    }

    this.href = `/tour/${this.alias}/tim-kiem`;
  }
}
