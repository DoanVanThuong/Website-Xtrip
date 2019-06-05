import * as _ from 'lodash';

export class FlightSearch {

  RoundTrip: boolean = false;
  Origin: string = '';
  Destination: string = '';
  DepartDate: string = '';
  ReturnDate: string = '';
  CurrencyType: string = 'VND';
  Adult: number = 1;
  Child: number = 0;
  Infant: number = 0;
  SeatClass: any = null;
  DirectionCode: number = 1;
  SelectDepartValue: string = null;
  Month: string = '';
  Year: string = '';
  Cheap: boolean = false;
  sort: number = null;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });
    }
  }
}