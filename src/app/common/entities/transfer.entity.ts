export class Transfer {

  accountNo: string = '';
  accountName: string = '';
  bankName: string = '';
  branch: string = '';
  paymentExpiredDate: string = '';
  cardNo: string = '';
  description: string = '';

  isPayNow: boolean = false;
  orderTotal: number = 0;
  gateway: string = null;
  method: string = null;
  option: string = null;
  status: number = null;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {
      let self = this;
      _.each(data, (val, key) => {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });

      if (!!data.acountName) {
        this.accountName = data.acountName;
      }
    }
  }
}
