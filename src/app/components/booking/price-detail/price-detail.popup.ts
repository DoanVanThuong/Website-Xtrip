import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';

@Component({
  selector: 'price-detail-popup',
  templateUrl: 'price-detail.popup.html',
  styleUrls: ['price-detail.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class PriceDetailPopup extends PopupBase {

  @Input('summaryPrice') summaryPrice: any;
  @Input('totalPrice') totalPrice: number = 0;

  @Output('event') event: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {

  }

  handle(type, e) {
    let event: string = type;
    this.event.emit(event)
  }

}
