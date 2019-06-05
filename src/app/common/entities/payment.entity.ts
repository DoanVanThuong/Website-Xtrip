import {Bank} from './bank.entity';
import {environment} from '../../../environments/environment';
import {PAYMENT_METHOD} from '../../app.constants';

export class Payment {

  code: string = '';
  description: string = '';
  detail: PaymentDetailPrice = new PaymentDetailPrice();
  gateway: string = '';
  layout: string = '';
  name: string = '';
  options: Bank[] = [];
  order: string = '';
  type: string = '';
  verify: string = '';
  detailLink: any = null;
  discountPercentage: number = 0;
  method: string = '';
  transactionNo: string = '';
  holdExpiry: string = '';
  orderTotal: number = 0;
  paymentMethodName: string = '';

  // customize
  photo: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['options'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      this.photo = `${environment.API_STATIC_URL}/payment/${this.gateway}/icon/${this.code}.png`;

      // handle logo with
      if (data.options) {

        this.options = data.options.map(item => {
          switch (this.code) {
            case PAYMENT_METHOD.TRANSFER:
            case PAYMENT_METHOD.ATM: {

              item = Object.assign(item, {
                photo: `${environment.API_STATIC_URL}/payment/napas/icon/${item.icon}`
              });
              break;
            }
            case PAYMENT_METHOD.STORE: {
              item = Object.assign(item, {
                photo: `${environment.API_STATIC_URL}/payment/Payoo/icon/${item.icon}`
              });
              break;
            }
          }

          return new Bank(item);
        });
      }

      if (!!data.detail) {
        this.detail = new PaymentDetailPrice(data.detail);
      }
    }
  }
}

export class PaymentDetailPrice {

  paymentFee: number = 0;
  totalPayment: number = 0;
  totalPrice: number = 0;

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
