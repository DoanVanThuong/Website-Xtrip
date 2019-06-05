import * as _ from 'lodash';

export class HotelStayInfo {

  checkIn: string = '';
  checkOut: string = '';
  rooms: number = 0;
  roomOccupancies: any = [];

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {
      let self = this;
      let keys = [];
      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });
  
      if(!!data.roomOccupancies) {
        this.roomOccupancies = data.roomOccupancies.split(',').map((ob: any) => {
          return { adults: ob.split('-')[0], children: ob.split('-')[1] }
        });
      }
    }
  }
}