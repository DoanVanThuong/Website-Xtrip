import { Component, ViewEncapsulation, Input } from '@angular/core';
import { HotelRepo } from '../../../../../common';

@Component({
    selector: 'app-hotel-policy-desktop',
    templateUrl: 'hotel-policy.html',
    styleUrls: ['../hotel-facilities/hotel-facilities-desktop.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class HotelPolicyDesktop {

  @Input('code') code: any = {};

  policy: any = [];

  constructor(
    protected _hotelRepo: HotelRepo
  ) {
  }

  ngOnInit(): void {
    this.getPolicy(this.code);
  }

  // fn get policy
  getPolicy = (code) => {
    this._hotelRepo
      .getPolicies(code)
      .then(
        (res: any) => {
          this.policy = res.data.policies;
        }
      );
  };

}
