import { Component, ViewEncapsulation } from '@angular/core';
import { PaymentResultMobileComponent } from '../mobile/payment-result-mobile.component';

@Component({
    selector: 'app-payment-result-desktop',
    templateUrl: 'payment-result-desktop.component.html',
    styleUrls: ['payment-result-desktop.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentResultDesktopComponent extends PaymentResultMobileComponent {
  
}
