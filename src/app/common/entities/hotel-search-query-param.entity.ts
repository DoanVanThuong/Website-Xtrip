import * as _ from 'lodash';

export class HotelSearchQueryParams {

  code: string = '';
  checkIn: string = '';
  checkOut: string = '';
  roomOccupancies: string = '';
  sortIndex: number = 0;
  filterOptions: any = null;
  hotelCode: string = null;

  adults: number = 0;
  rooms: number = 0;

  // custom
  name: string = '';
  latitude: number = 0;
  longitude: number = 0;
  destinationType: string = '';
  destinationCode: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {
      let self = this;
      let keys = ['filterOptions'];
      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });
      // if(!!data.roomOccupancies) {
      //   this.roomOccupancies = data.roomOccupancies.split(',').map((ob: any) => {
      //     return { adults: ob.split('-')[0], children: ob.split('-')[1] }
      //   });
      // }
    }
  }
}
