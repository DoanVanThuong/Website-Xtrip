import {Component, ViewEncapsulation} from '@angular/core';
import {ProductBookingMobileComponent} from '../mobile/product-booking-mobile.component';

@Component({
  selector: 'app-product-booking-desktop',
  templateUrl: './product-booking-desktop.component.html',
  styleUrls: ['./product-booking-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductBookingDesktopComponent extends ProductBookingMobileComponent {

}
