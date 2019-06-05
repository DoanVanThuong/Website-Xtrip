import {Component, Input} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'chat-info-popup',
  templateUrl: './chat-info.popup.html',
  styleUrls: ['./chat-info.popup.less']
})
export class ChatInfoPopupComponent extends PopupBase {

  @Input() contact: Partial<IFeedbackContact> = {
    fbLink: 'https://m.me/Xtrip.vn',
    zaloLink: 'https://zalo.me/231865832426449833'
  };
  chats: any[] = [];

  constructor() {
    super();

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.chats = [
      {title: 'Chat qua Facebook Message', icon: 'assets/images/icon/icon-fb-messenger.svg', link: this.contact.fbLink},
      {title: 'Chat qua Zalo', icon: 'assets/images/icon/icon-zalo.svg', link: this.contact.zaloLink}
    ];
  }
}

interface IFeedbackContact {
  fbLink: string;
  hotline: string;
  zaloLink: string;
}
