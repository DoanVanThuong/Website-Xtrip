import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MyBookingIndexMobileComponent} from '../mobile/my-booking-index-mobile.component';

@Component({
  selector: 'my-booking-index-desktop',
  templateUrl: './my-booking-index-desktop.component.html',
  styleUrls: ['./my-booking-index-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MyBookingIndexDesktopComponent extends MyBookingIndexMobileComponent {
  
}
