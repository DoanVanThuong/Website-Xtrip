import {Component} from '@angular/core';
import {PopupBase} from '../popup.base';
import {GlobalRepo} from '../../../common';

@Component({
  selector: 'feedback-popup',
  templateUrl: './feedback.popup.html',
  styleUrls: ['./feedback.popup.less']
})
export class FeedbackPopup extends PopupBase {

  emoticons: Array<any> = [1, 2, 3, 4, 5];
  selected: number = -1;
  feedback: any = {
    Emotion: 0,
    Question: '',
    Comment: ''
  };

  isComment: boolean = false;

  constructor(private _globalRepo: GlobalRepo) {
    super();
  }

  ngOnInit() {
    this.onInit = this.onInitital;
  };

  // popup initial
  onInitital = (): void => {

    this.setOptions({
      backdrop: 'static',
      ignoreBackdropClick: true
    });

    this.isComment = false;
    this.selected = -1;
  };

  // on select rating
  onRating = (pos: any) => {
    this.selected = pos;

    this.feedback.Emotion = pos + 1;
    this.isComment = true;
  };

  // fn on feedback
  onFeedback = () => {
    return this._globalRepo
      .rating(this.feedback)
      .then(
        (res: any) => {
          this.hide();
        }
      );
  };
}
