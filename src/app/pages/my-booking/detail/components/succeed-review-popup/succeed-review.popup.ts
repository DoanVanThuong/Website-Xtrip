import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../../../../components/popup';

@Component({
  selector: 'succeed-review-popup',
  templateUrl: './succeed-review.popup.html',
  styleUrls: ['./succeed-review.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class SucceedReviewPopup extends PopupBase {

  @Input() code: string = null;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  comment: string = '';
  ratingLabel: Array<string> = ['Thoải mái', 'Dịch vụ', 'Sạch sẽ', 'Đồ ăn', 'Tiện nghi'];
  rating: Array<number> = this.ratingLabel.map(item => 0);

  constructor() {
    super();
  }

  ngOnInit() {
    // this.show();
  }

  // submit review
  onSubmit = () => {

    this.submit.emit({
      reservationCode: this.code,
      individualComment: this.comment,
      ratedCategories: this.rating.map((value, index) => {
        return {
          categoryCode: index + 1,
          categoryName: this.ratingLabel[index],
          stars: value
        };
      })
    });

  };

}