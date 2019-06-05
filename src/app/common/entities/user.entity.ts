import * as _ from 'lodash';

export class User {

  id: string = '';
  title: string = '';
  emails: Array<any> = [];
  phones: Array<any> = [];

  firstName: string = '';
  lastName: string = '';
  fullName: string = '';
  birthday: string = '';
  picture: string = '';
  userType: string = '';
  rewardPoints: any = {
    available: 0,
    pending: 0
  };

  walletAvailableBalance: any = null;
  walletBalance: any = null;
  walletBlockedBalance: any = null;


  // custom fields
  name: string = '';
  phone: string = '';
  email: string = '';
  points: number = 0;
  avatar: string = '';
  loginType: string = '';
  isLocalUser: boolean = false;
  coupon: number =0;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['emails', 'phones'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      // email
      if (!!data.emails && data.emails.length) {
        this.emails = data.emails;
      }
      if (!this.email) {
        this.email = '';
      }

      // phone
      if (!!data.phones && data.phones.length) {
        this.phones = data.phones;
      }
      if (!this.phone) {
        this.phone = '';
      }

      // point
      if (data.rewardPoints && data.rewardPoints.available) {
        this.points = data.rewardPoints.available;
      }

      if (!!data.userType && data.userType.toLowerCase() === 'local') {
        this.isLocalUser = true;
      }

      // customize
      if(this.firstName || this.lastName){
        this.fullName = `${this.lastName || ''} ${this.firstName || ''}`.trim();
        this.name = `${this.lastName || ''} ${this.firstName || ''}`.trim();
      }

      this.avatar = data.picture || 'assets/images/avatar-thumbnail.svg';

      this.email = this.emails.length ? this.emails[0].addr : '';
      this.phone = this.phones.length ? this.phones[0].number : '';
    }
  }
}
