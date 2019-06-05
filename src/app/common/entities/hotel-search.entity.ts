import * as _ from 'lodash';
import { HotelDestination } from './hotel.destination.entity';


export class HotelSearch {

  checkIn: string = '';
  checkOut: string = '';
  // numberRooms: number = 1;
  roomOccupancies: any = '';
  sortIndex: number = 0;
  destination: HotelDestination = null;
  filterOptions: any = null;
  hotelCode: string = null;

  adults: number = 1;
  rooms: number = 1;

  // custom
  name: string = '';
  latitude: number = 0;
  longitude: number = 0;
  destinationType: string = '';
  destinationCode: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['destination', 'filterOptions'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (!!data.destination) {
        this.destination = new HotelDestination(data.destination);
      }
      if(!!data.roomOccupancies && typeof(data.roomOccupancies) === 'string') {
        this.roomOccupancies = data.roomOccupancies.split(',').map((ob: any) => {
          return { adults: ob.split('-')[0], children: ob.split('-')[1] }
        });
      }
    }
  }
}

