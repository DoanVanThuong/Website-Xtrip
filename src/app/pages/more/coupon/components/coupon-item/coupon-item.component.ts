import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {AppBase} from "../../../../../app.base";

@Component({
  selector: 'app-coupon-item',
  templateUrl: 'coupon-item.component.html',
  styleUrls: ['coupon-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponItem extends AppBase{

  @Input('coupon') coupon: any = {};
  @Output('select') select = new EventEmitter<any>();

  constructor(private _toastr: ToastrService) {
    super();
  }

  //get type coupon
  checkTypeCoupon = (type) => {
    return type === 0 ? 'type-0' : type === 1 ? 'type-1' : 'type-2';
  };

  //check remaining time coupon
  remainingTime(time) {
    let now = moment();
    let expiredDate = moment(time);
    let diffDate = expiredDate.diff(now, 'd');
    if (Number(diffDate) > 0) {
      return `Còn ${diffDate} ngày`;
    } else {
      let diffHour = expiredDate.diff(now, 'hours');
      return `Còn ${diffHour} giờ`;
    }
  }

  //on click copy code
  onClipboardSuccess = (code) => {
    this._toastr.success('Đã copy mã', 'Thông báo', {
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      progressBar: false
    });
  };

  //select coupin item
  selectCoupon() {
    this.select.emit();
  }

}
