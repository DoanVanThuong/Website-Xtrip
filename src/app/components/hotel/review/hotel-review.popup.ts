import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../popup/popup.base';
import {HotelRepo} from '../../../common/repos';
import {Hotel} from './../../../common/entities';

@Component({
  selector: 'hotel-review-popup',
  templateUrl: './hotel-review.popup.html',
  styleUrls: ['./hotel-review.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelReviewPopup extends PopupBase {

  @Input('code') code: string = '';
  @Input('params') params: any = {};

  hotel: Hotel = new Hotel();
  generalReview: any = {};
  moreReview: any = {};

  constructor(private _hotelRepo: HotelRepo) {
    super();
  }

  // on initial
  ngOnInit() {

  }

  ngOnChanges() {

    if (this.code) {
      this.getGeneralReview(this.code);
      this.getMoreReview(this.code);
    }
  }

  // fn get general review
  getGeneralReview = (code: string = '') => {

    return this._hotelRepo
      .getGeneralReview(this.code)
      .then(
        (res: any) => {
          this.generalReview = res.data;
        }
      );
  };

  // fn get more review
  getMoreReview = (code: string = '') => {

    this._hotelRepo
      .getMoreReview(this.code)
      .then(
        (res: any) => {
          this.moreReview = res.data;
        }
      );
  };

  generateQueryParams = (): Object => {
    return {}
  }
}
