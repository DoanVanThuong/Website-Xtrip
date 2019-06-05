import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {PopupBase} from '../../../../../components/popup';
import {Router} from '@angular/router';

@Component({
  selector: 'booking-report-popup',
  templateUrl: './report.popup.html',
  styleUrls: ['./report.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingFlightReportPopup extends PopupBase {

  @Input() code: string = null;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  methods:any[] = [
    {mode: 'pdf', available: true},
    {mode: 'image', available: false},
  ];

  constructor() {
    super();
  }

  // fn on select
  onSelect = (type: string): void => {
    if (!!type) {
      this.select.emit(type);
    }

    this.hide();
  };

}
