import {Photo} from './photo.entity';
import {ProductDestination} from './product-destination.entity';

export class Product {

  id: string = '';
  code: string = '';
  name: string = '';
  alias: string = '';
  destination: ProductDestination = new ProductDestination();
  points: number = 0;
  instantConfirmation: boolean = false;
  photo: Photo = new Photo();

  photos: Photo[] = new Array<Photo>();
  tag: any = null;
  sellingPrice: number = 0;
  originalPrice: number = 0;
  durationDays: number = 0;
  durationHours: number = 0;
  durationMinutes: number = 0;
  openingHours: number = 0;
  minPax: number = 1;
  maxPax: number = 0;
  percentDiscount: number = 0;
  properties: any[] = [];

  description: string = '';
  highlights: string = '';
  itinerarys: string = '';
  priceIncludes: string = '';
  priceExcludes: string = '';
  latitude: number = 0;
  longitude: number = 0;
  notes: string = '';
  guides: string = '';
  address: string = '';
  reviewCount: number = 0;
  reviewAverageScore: number = 0;
  feedbackContact: any = {
    fbLink: '',
    hotline: '',
    zaloLink: ''
  };

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {
      let self = this;

      let keys = ['destination', 'photo', 'photos'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (data.destination) {
        this.destination = new ProductDestination(data.destination);
      }

      if (data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (data.photos) {
        this.photos = data.photos.map(photo => new Photo(photo));
      }
    }
  }
}

