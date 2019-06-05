import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {NotificationGeneralComponent} from '../../../../../pages/notification/components/general/general.component';

@Component({
  selector: 'app-notification-desktop',
  templateUrl: './notification-desktop.component.html',
  styleUrls: ['./notification-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationDesktopComponent extends NotificationGeneralComponent {

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  isShowNotification: boolean = false;
  notificationBadge: number = 0;

  ngOnDestroy() {
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.updateBadge();
    this.getNotificationCheck();
  }

  onClickedOutside($event, type: string) {
    this.isShowNotification = false;
  }

  // fn check notification
  getNotificationCheck() {

    return this._messageRepo
      .check()
      .then(
        (res: any) => {
          if (res.data.hasItems) {
            this.notificationBadge = res.data.inboxTotal + res.data.generalTotal;
          }
        }
      );
  }

  //fn open notification
  openNotification() {
    // reset notification badge
    this.isShowNotification = !this.isShowNotification;
    if (this.isShowNotification) {
      this.notificationBadge = 0;
    }
  }

  //fn close notification  dropdown
  onCloseNotification() {
    this.isShowNotification = false;
  }
}
