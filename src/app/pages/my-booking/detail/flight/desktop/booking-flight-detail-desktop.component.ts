import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {BookingFlightDetailMobileComponent} from '../mobile/booking-flight-detail-mobile.component';
import {ChangePaymentMethodPopup} from '../../../components/method-change-payment-popup/method-change-payment.popup';

@Component({
  selector: 'booking-flight-detail-desktop',
  templateUrl: './booking-flight-detail-desktop.component.html',
  styleUrls: ['./booking-flight-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingFlightDetailDesktopComponent extends BookingFlightDetailMobileComponent {

  @ViewChild(ChangePaymentMethodPopup) changePaymentPopup: ChangePaymentMethodPopup;

  onShowChangePopup = (): void => {
    this.changePaymentPopup.show();
  };

  //submit event after changed payment 
  submitChangePayment = () => {
    this.getFlight({code: this.code});
  };

}



