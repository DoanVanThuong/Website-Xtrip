import {Component, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'app-coupon-hotel-item-detail',
  templateUrl: 'coupon-hotel-item-detail.component.html',
  styleUrls: ['coupon-hotel-item-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CouponHotelItemDetail {

  @Input('hotel') hotel: any = {};

  constructor() {
  }

  ngOnInit() {

  }

}
