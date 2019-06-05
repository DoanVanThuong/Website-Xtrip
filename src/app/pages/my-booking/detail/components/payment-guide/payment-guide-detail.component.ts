import {Component, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {Payment, Transfer} from '../../../../../common/entities';
import {AppBase} from '../../../../../app.base';
import {PAYMENT_METHOD} from '../../../../../app.constants';
import {BookingRepo} from '../../../../../common/repos';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {isPlatformBrowser} from '@angular/common';

declare var window: any;

@Component({
  selector: 'payment-guide-detail',
  templateUrl: './payment-guide-detail.component.html',
  styleUrls: ['./payment-guide-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentGuideDetailComponent extends AppBase {

  @Input() module: string = '';
  @Input() code: string = '';
  @Input() delay: number = 0; // 0ms
  @Input() data: any = {};

  url: string = environment.API_STATIC_URL + '/payment/napas/icon/';
  METHOD: any = PAYMENT_METHOD;
  paymentInfo: Transfer = new Transfer();
  bankCode: string;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _bookingRepo: BookingRepo,
              private _toastr: ToastrService,
              @Inject(PLATFORM_ID) private platformId: string) {
    super();
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(this.getPaymentInfo, this.delay);
    }
  }

  //get payment info
  getPaymentInfo = (): Promise<any> => {

    return this._bookingRepo
      .getPaymentInfo(this.module, this.code)
      .then(
        (res: any) => {
          this.bankCode = res.data.option || '';
          this.paymentInfo = new Transfer(res.data);
        }
      );
  };

  // fn clipboard success callback
  onClipboardSuccess = (content: any) => {
    this._toastr.success(content, 'Thông báo', {
      positionClass: 'toast-top-right'
    });
  };

}



