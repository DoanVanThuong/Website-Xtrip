import { Component, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-coupon-tour-item-detail',
  templateUrl: 'coupon-tour-item-detail.component.html',
  styleUrls: ['coupon-tour-item-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponTourItemDetail {

  @Input('tour') tour: any = {};

  constructor() {
  }

  checkTypeDateTour(type: number = 0, date: string, dates: Array<any> = []) {
    switch (type) {
      case 0: {
        return moment(date).format('DD/MM/YYYY'); // tour 1 ngày
      }
      case 1: {
        return 'Hằng ngày'; //tour hằng ngày
      }
      default: {
        return moment(dates[0]).format('DD/MM/YYYY');  //tour nhiều ngày
      }
    }
  }

}
