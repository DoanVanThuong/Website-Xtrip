import { RoomGroup } from './hotel.entity';

export class BookingHotel {

  checkIn: string = '';
  checkOut: string = '';
  requestId: string = '';
  rooms: number = 0;
  adults: number = 0;
  invoiced: boolean = false;
  bookData: any = {};
  vatInvoiceInfo: any = {};
  children: number = 0;
  hotel: any = null;
  nights: number = 1;
  roomDetails: RoomGroup = new RoomGroup();
  roomPolicy: string = '';
  detailPrices: any[]  = [];
  constructor(data?: any) {
    if (!_.isEmpty(data)) {
      let self = this;
      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });
      if (data.roomDetails) {
        this.roomDetails = new RoomGroup(data.roomDetails);
      }
    }
  }
}