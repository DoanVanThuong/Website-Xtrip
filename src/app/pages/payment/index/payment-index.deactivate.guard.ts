import {CanDeactivate} from '@angular/router';
import {PaymentIndexComponent} from './payment-index.component';

export class PaymentIndexDeactivateGuard implements CanDeactivate<PaymentIndexComponent> {

  canDeactivate(component: PaymentIndexComponent): boolean {
    return component.isValidUrl;
  }
}