import {Room} from './room.entity';
import {Photo} from './photo.entity';
import {Facility} from './facility.entity';
import {HotelLocation} from "./hotel-location.entity";

export class Hotel {
  code: string = '';
  name: string = '';
  fullAddress: string = '';
  accommodationTypeCode: string = '';
  stars: number = 0;
  reviews: number = 0;
  rating: number = 0;
  currency: string = '';
  discountPercentage: number = 0;
  discountPrice: number = 0;
  originalPrice: number = 0;
  sellingPrice: number = 0;
  latitude: number = 0;
  longitude: number = 0;
  description: string = '';
  facilities: Array<Facility> = [];
  popularPoints: any[] = [];
  photo: Photo = new Photo();
  photos: Photo[] = [];
  policies: any = null;
  coupon: any = null;
  
  mainFacilities: Array<Facility> = [];
  points: number = 0;
  preferServices: Array<any> = [];
  rooms: Array<Room> = [];
  salePrice: number = 0;
  sources: Array<any> = [];
  star: number = 0;
  isSoldOut: boolean = false;
  destination: HotelLocation = new HotelLocation();
  nearBy: string = '';

  // custom fields
  type: string = null;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['facilities', 'photo', 'rooms', 'destination'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (!!data.facilities) {
        this.facilities = data.facilities.map(facility => new Facility(facility));
      }

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.rooms) {
        this.rooms = data.rooms.map(room => new Room(room));
      }

      if (!!data.destination) {
        this.destination = new HotelLocation(data.destination);
      }
    }
  }
}

export class RoomGroup {
  couponCode: string = '';
  couponDiscountPrice: number = 0;
  name: string= '';
  points: number = 0;
  promotionPrice: number = 0;
  promotionPriceNote: string = '';
  selectedValue: string = '';
  sellingPrice: number = 0;
  sellingPriceNote: string = '';
  rooms: any[] = [];
  constructor(data?: any) {
    if (!_.isEmpty(data)) {
      let self = this;
      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });

    }
  }
}

