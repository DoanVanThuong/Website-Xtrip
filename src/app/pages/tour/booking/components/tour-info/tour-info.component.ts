import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {BookingTour, Tour, TourPackage} from '../../../../../common';
import {TourDetailPopupComponent} from '../tour-detail/tour-detail-popup.component';

@Component({
  selector: 'tour-booking-info',
  templateUrl: './tour-info.component.html',
  styleUrls: ['./tour-info.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourBookingInfoDesktopComponent extends AppBase {

  @Input() tour: Tour = new Tour();
  @Input() bookingInfo: BookingTour = null;
  @Input() journey: any = null;
  @Input() package: TourPackage = null;
  @ViewChild(TourDetailPopupComponent) tourDetail: TourDetailPopupComponent;
  totalPassengers: number = 0;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!!this.tour && !!this.bookingInfo) {
      this.totalPassengers = _.sum([this.bookingInfo.adults, this.bookingInfo.infants, this.bookingInfo.children]);
    }
  }

  viewDetailTourBooking() {
    this.tourDetail.show();
  }
}
