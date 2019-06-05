import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../app.base';
import {FeedbackPopup} from '../../components/popup';

@Component({
  selector: 'app-loadmore',
  templateUrl: './more.component.html',
  styleUrls: [
    './more.component.css',
    './more.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MoreComponent extends AppPage {

  @ViewChild(FeedbackPopup) feedbackPopup: FeedbackPopup;
  isFeedbackPopup: boolean = false;
  isPhoneSupportPopup: boolean = false;

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {

    if (this.isDesktop) {
      this._router.navigate(['/more/faq']);
    }

  }

  // fn open feedback
  openFeedback = (): void => {
    this.feedbackPopup.show();
  };

}