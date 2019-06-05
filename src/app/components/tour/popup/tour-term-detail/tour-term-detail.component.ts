import { Component, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
  selector: 'app-tour-term-detail-popup',
  templateUrl: './tour-term-detail.component.html',
  styleUrls: ['./tour-term-detail.component.less', '../tour-journey-detail/tour-journey-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourTermDetailPopup extends PopupBase {

  @Input() data: any = null;
  @Input() mode: string = '';
  @Input() tabIndex: number = 0;
  @Output() indexChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super() }

  selectedIndexChange(e) {
    this.indexChange.emit(e);
  }

}
