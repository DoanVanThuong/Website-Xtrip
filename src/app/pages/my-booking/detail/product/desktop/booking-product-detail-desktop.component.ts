import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {BookingProductDetailMobileComponent} from '../mobile/booking-product-detail-mobile.component';
import {ChangePaymentMethodPopup} from '../../../components/method-change-payment-popup/method-change-payment.popup';

@Component({
  selector: 'booking-product-detail-desktop',
  templateUrl: './booking-product-detail-desktop.component.html',
  styleUrls: ['./booking-product-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingProductDetailDesktopComponent extends BookingProductDetailMobileComponent {

  @ViewChild(ChangePaymentMethodPopup) changePaymentPopup: ChangePaymentMethodPopup;

  // handle content
  onHandleContent = (text: string): Array<string> => {
    // note
    return this.utilityHelper.breakString(text).map(note => {
      if (note[0] === '-') {
        return note.substr(2, note.length);
      } else {
        return note;
      }
    });
  };

  // select link to show
  onSelectLink = (link: any = null) => {
    this.selectedLink = link;
    this.isViewMode = true;
  };

  //show popup change payment
  showPopupChangePayment() {
    this.changePaymentPopup.show();
  }
}
