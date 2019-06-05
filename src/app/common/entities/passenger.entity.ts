import * as _ from 'lodash';
import * as moment from 'moment';

export class Passenger {

  title: string = '';
  firstName: string = '';
  lastName: string = '';

  nationality: string = '';
  idCardNumber: string = '';
  birthDay: string = '';

  address: string = '';
  city: string = '';
  country: any = null;
  createdDate: string = '';
  dateOfBirth: string = '';
  deviceId: any = null;
  email: string = '';
  id: string = '';
  identityCard: string = '';
  identityCardCountry: string = '';
  identityCardDate: string = '';
  identityCardExpiry: string = '';
  inactive: boolean = false;
  lastModified: string = '';
  mobileNumber: string = '';
  national: string = '';
  passportNumber: string = '';
  passportCountry: string = '';
  passportExpiry: string = '';
  phoneNumber: string = '';
  province: string = '';
  userId: string = '';
  passengerType: string = null;
  standardTitle: string = null;
  departBaggage: number = 0;
  returnBaggage: number = 0;

  // temporary values
  type: string = '';
  typeName: string = '';
  baggages: Array<any> = [];

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

      if (!!this.dateOfBirth) {
        moment(this.dateOfBirth).format('DD/MM/YYYY');
      }
    }
  }
}