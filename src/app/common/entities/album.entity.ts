import {Photo} from './photo.entity';

export class Album {

  alias: string = null;
  code: string = '';
  description: string = '';
  name: string = '';
  photo: Photo = new Photo();
  photos: Photo[] = [];


  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;
      let keys = ['photo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (data.photos) {
        this.photos = data.photos.map(photo => new Photo(photo));
      }
    }
  }
}