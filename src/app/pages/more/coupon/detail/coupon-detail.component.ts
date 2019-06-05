import { Component, OnInit } from '@angular/core';
import { AppBase } from '../../../../app.base';

@Component({
  selector: 'app-coupon-detail',
  template: `
    <app-coupon-detail-mobile></app-coupon-detail-mobile>
  `
})
export class CouponDetailComponent extends AppBase {
  constructor() {
    super();
  }

}
