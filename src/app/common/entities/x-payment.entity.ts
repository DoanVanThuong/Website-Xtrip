import {environment} from '../../../environments/environment';

export class XPayment {

  xpay_SecureHash?: string = '';
  xpay_Amount?: number = 0;
  xpay_BookingCode?: string = '';
  xpay_Currency?: string = '';
  xpay_Gateway?: string = '';
  xpay_Locale?: string = '';
  xpay_Method?: string = '';
  xpay_Module?: string = '';
  xpay_Order?: string = '';
  xpay_Reference?: string = '';
  xpay_ResponseCode?: number = -1;
  xpay_Type?: string = '';
  xpay_Message?:string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;
      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });
    }
  }
}