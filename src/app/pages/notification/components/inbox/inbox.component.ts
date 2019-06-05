import {Component} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {MessageRepo, Notification, Security} from '../../../../common/index';

@Component({
  selector: 'notification-inbox',
  templateUrl: './inbox.component.html'
})
export class NotificationInboxComponent extends AppPage {

  isLoading: boolean = false;
  isScroll: boolean = true; // scroll to load
  notifications: Array<Notification> = [];

  constructor(private _messageRepo: MessageRepo,
              private _security: Security) {
    super();
  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.getInbox();
    }
  }

  // scroll down to load more
  onScrollDown() {
    if (this._security.isAuthenticated()) {
      if (!this.isLoading && this.isScroll) {
        this.offset += this.limit;
        this.getInbox();
      }
    }
  }

  // fn get inbox
  getInbox() {

    this.isLoading = true;

    return this._messageRepo
      .getInbox(this.offset, this.limit)
      .then(
        (res: any) => {
          this.isLoading = false;

          if (!res.data.results.length) {
            this.isScroll = false;
          }
          this.notifications = this.notifications.concat(res.data.results.map(item => new Notification(item)));
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  }
}