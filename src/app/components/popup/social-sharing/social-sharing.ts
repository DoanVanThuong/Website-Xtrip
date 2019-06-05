import {Component, ViewEncapsulation, Input, OnChanges} from '@angular/core';
import {PopupBase} from '../popup.base';

@Component({
  selector: 'social-sharing',
  templateUrl: './social-sharing.html',
  styleUrls: ['./social-sharing.less'],
  encapsulation: ViewEncapsulation.None
})
export class SocialSharing extends PopupBase {

  @Input() title: string = '';
  @Input() image: string = '';
  @Input() description: string = '';

  url = window.location.href || 'https://xtrip.vn';

  constructor() {
    super();
  }

}
