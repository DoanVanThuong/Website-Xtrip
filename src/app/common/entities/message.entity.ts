import {Photo} from './photo.entity';

export class Message {

  fullName: string = '';
  avatar: Photo = new Photo();
  isCustomer: boolean = true;
  comment: string = '';
  createdDate: string = '';

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['avatar'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });


      if (!!data.avatar) {
        this.avatar = new Photo(data.avatar);
      }
    }
  }
}