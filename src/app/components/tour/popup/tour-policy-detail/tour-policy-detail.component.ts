import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
  selector: 'app-tour-policy-detail-popup',
  templateUrl: './tour-policy-detail.component.html',
  styleUrls: ['./tour-policy-detail.component.less', '../tour-journey-detail/tour-journey-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourPolicyDetailPopup extends PopupBase {

  @Input() data: any = null;
  @Input() mode: string = ''; //old; new
  @Input() tabIndex: number = 0;
  @Output() indexChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super() }

  selectedIndexChange(e) {
    this.indexChange.emit(e);
  }

}
