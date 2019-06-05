import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
  selector: 'app-tour-journey-detail-popup',
  templateUrl: './tour-journey-detail.component.html',
  styleUrls: ['./tour-journey-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourJourneyDetailPopup extends PopupBase {

  @Input() data: any = null;
  @Input() tabIndex: number = 0;
  @Output() indexChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super() }

  selectedIndexChange(e) {
    this.indexChange.emit(e);
  }

}
