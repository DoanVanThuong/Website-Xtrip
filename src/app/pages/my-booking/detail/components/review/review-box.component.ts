import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {CommentPopup} from '../comment-popup/comment.popup';

@Component({
  selector: 'review-box',
  templateUrl: './review-box.component.html',
  styleUrls: ['./review-box.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewBoxComponent extends AppBase {

  @Input() categories: Array<string> = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(CommentPopup) popup: CommentPopup = new CommentPopup();

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  openPopup = () => {
    this.popup.show();
  };

  // fn on submit
  onSubmit = ($event: any) => {
    this.submit.emit($event);
  };
}



