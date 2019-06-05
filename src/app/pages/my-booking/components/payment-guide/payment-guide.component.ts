import {Component, ViewEncapsulation} from '@angular/core';
import {Spinner, BookingRepo, Error, Transfer} from '../../../../common';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppBase} from '../../../../app.base';
import {PAYMENT_METHOD} from '../../../../app.constants';


const staticURL = environment.API_STATIC_URL + '/payment/napas/icon/';

@Component({
  selector: 'app-payment-guide',
  templateUrl: './payment-guide.component.html',
  styleUrls: ['./payment-guide.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentGuideComponent extends AppBase {

  data: any = null;

  url = staticURL;
  bankCode: string = '';
  paymentInfo: Transfer = new Transfer();
  METHOD: any = PAYMENT_METHOD;

  constructor(private _spinner: Spinner,
              private _bookingRepo: BookingRepo,
              private activatedRoute: ActivatedRoute,
              private _location: Location,
              private _toast: ToastrService) {
    super();
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getData(params);
      this.getPaymentInfo(params);
    });
  }

  backTo = (): void => {
    this._location.back();
  };

  //get data booked flight by code
  getData(params: any) {

    this._spinner.show('Vui lòng chờ...');

    return this._bookingRepo
      .getBookedDetail(params.module, params.code)
      .then(
        (res: any) => {

          this.data = params.module === 'flight' ? res.data.reservation : res.data;
          this._spinner.hide();

        },
        (errors: Error[] = []) => {
          this.handleError(errors);
          this._spinner.hide();
        }
      );
  }

  //fn handle error
  handleError(errors: any) {
    const error: Error = new Error(errors[0]);
    this._toast.error('Lỗi', error.value);
  }

  //get payment info
  getPaymentInfo(params) {
    return this._bookingRepo
      .getPaymentInfo(params.module, params.code)
      .then(
        (res: any) => {
          this.bankCode = res.data.option || '';
          this.paymentInfo = new Transfer(res.data);
        }
      );
  }


}



