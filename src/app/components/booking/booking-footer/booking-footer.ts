import {Component, Input, ViewEncapsulation, Output, EventEmitter, ViewChild} from '@angular/core';
import {PriceDetailPopup} from '../../../components';

@Component({
  selector: 'booking-footer',
  templateUrl: './booking-footer.html',
  styleUrls: ['./booking-footer.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingFooter {

  @ViewChild(PriceDetailPopup) priceDetail: PriceDetailPopup;

  @Input() summaryPrice: any;
  @Input() totalPrice: number = 0;
  @Input() disabled: boolean = false;

  @Output() submitGotoPreview: EventEmitter<any> = new EventEmitter<any>();

  upArrow: boolean = false;

  constructor() {
  }

  //goto review ticket page
  goToPreviewTicket() {
    this.submitGotoPreview.emit();
  }

  //show/hide detail-item price
  showPriceDetail = ($event: any): void => {
    !this.upArrow ? this.priceDetail.show() : this.priceDetail.hide();
  };

  //event popup 
  event(e) {
    e.toLowerCase() === 'onshow' ? this.upArrow = true : this.upArrow = false;
  }
}
