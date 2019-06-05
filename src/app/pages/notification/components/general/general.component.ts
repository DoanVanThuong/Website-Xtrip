import {Component} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {MessageRepo, Notification} from '../../../../common/index';
import {GlobalState} from '../../../../global.state';

@Component({
  selector: 'notification-general',
  templateUrl: './general.component.html'
})
export class NotificationGeneralComponent extends AppPage {

  isLoading: boolean = false;
  isScroll: boolean = true; // scroll to load
  notifications: Array<Notification> = [];

  constructor(public _messageRepo: MessageRepo,
              private _state: GlobalState) {
    super();
  }

  ngOnInit(): void {
    this.updateBadge();
  }

  onScrollDown() {
    if (!this.isLoading && this.isScroll) {
      this.offset += this.limit;
      this.getGeneral();
    }
  }

  // fn get general
  getGeneral() {

    this.isLoading = true;

    return this._messageRepo
      .getGeneral(this.offset, this.limit)
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

  // fn on read item
  onRead(notification: any) {

    if (!notification.opened) {

      return this._messageRepo
        .openGeneral(notification.code)
        .then(
          (res: any) => {
            if (res.code.toLowerCase() === 'success') {
              notification.opened = true;
            }
          }
        );
    }
  }

  async updateBadge() {
    try {
      const response: any = await this._messageRepo.updateBadge();
      if (response.code.toLowerCase() === 'success') {
        this._state.notifyDataChanged('badge:updated');
        this.getGeneral();
      }
    } catch (error) {

    }
  }
}
