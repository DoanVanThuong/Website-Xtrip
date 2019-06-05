import { Component, ViewEncapsulation } from '@angular/core';
import { PopupBase } from '../../../../../components/popup';

@Component({
    selector: 'app-success-request-popup',
    templateUrl: './success-request-popup.component.html',
    styleUrls: ['./success-request-popup.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class SuccessRequestPopup extends PopupBase {

  constructor() {
    super();
  }

}
