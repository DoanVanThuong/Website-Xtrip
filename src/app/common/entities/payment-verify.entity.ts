export class PaymentVerify {
  currency: string = "";
  gateway: string = "";
  message: any = new PaymentMessage();
  method: string = "";
  module: string = "";
  option: string = "";
  orderCode: string = "";
  orderTotal: number = 0;
  paymentExpired: string = "";
  pnr: string = "";
  transactionNo: any = null;

  constructor(data?: any) {
    let self = this;
    _.each(data, (val, key) => {
      if (self.hasOwnProperty(key)) {
        self[key] = val;
      }

      if (!!data.message) {
        this.message = new PaymentMessage(data.message);
      }
    });
  }
}

export class PaymentMessage {
  content: string = "";
  title: string = "";

  constructor(data?: any) {
    let self = this;
    _.each(data, (val, key) => {
      if (self.hasOwnProperty(key)) {
        self[key] = val;
      }
    });
  }
}