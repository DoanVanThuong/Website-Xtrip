import {Photo} from "./photo.entity";

export class Blog {

  alias: string = '';
  code: string = '';
  date: string = '';
  name: string = '';
  photo: Photo = new Photo();
  summary: string = '';
  url: string = ''
  view: number = 0;
  description: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }
    }
  }

}
