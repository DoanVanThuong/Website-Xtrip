import { Component, ViewEncapsulation, Input } from '@angular/core';
import { HotelRepo } from '../../../../../common';
import * as moment from 'moment';
@Component({
  selector: 'app-hotel-reviews',
  templateUrl: './hotel-reviews.component.html',
  styleUrls: ['hotel-reviews.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelReviewsDesktopComponent {

  @Input('code') code: any = '';

  generalReview: any = {};
  moreReview: any = {};
  numberComment: number = 3;

  constructor(
    protected _hotelRepo: HotelRepo
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getGeneralReview(this.code);
    this.getMoreReview(this.code, this.numberComment);
  }

  // fn get general review
  getGeneralReview = (code) => {
    return this._hotelRepo
      .getGeneralReview(code)
      .then(
        (res: any) => {
          this.generalReview = res.data;
        }
      );
  };

  // fn get more review
  getMoreReview = (code, length) => {
    this._hotelRepo
      .getMoreReview(code, 0, length)
      .then(
        (res: any) => {
          this.moreReview = res.data;
        }
      );
  };

  //get all cmt
  getAllCmt = () => {
    this.numberComment = this.moreReview.total;
    this.getMoreReview(this.code, this.numberComment);
  }

}