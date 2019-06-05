import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { AppBase } from '../../../../../app.base';
import { Router } from '@angular/router';
@Component({
    selector: 'app-coupon-flight-item-detail',
    templateUrl: 'coupon-flight-item-detail.component.html',
    styleUrls: ['coupon-flight-item-detail.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class CouponFlightItemDetail extends AppBase {

  @Input('flight') flight: any = {};
  
  constructor() {
    super();
  }

}
