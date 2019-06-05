import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../../../../components/popup';

@Component({
  selector: 'comment-popup',
  templateUrl: './comment.popup.html',
  styleUrls: ['./comment.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class CommentPopup extends PopupBase {

  @Input() code: string = null;
  @Input('categories') ratingLabel: Array<string> = ['Thoải mái', 'Dịch vụ', 'Sạch sẽ', 'Đồ ăn', 'Tiện nghi'];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  comment: string = '';
  rating: Array<number> = this.ratingLabel.map(item => 0);

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(){
    this.rating = this.ratingLabel.map(item => 0);
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

    this.hide();

  };

}