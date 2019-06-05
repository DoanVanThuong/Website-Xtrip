export class PaymentDeposit {
  
  amount: number = 0;
  amountPaid: number = 0;
  paymentFee: number = 0;
  amountUnPaid: number = 0;
  createdDate: string = '';

  
  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });

    }
  }
}