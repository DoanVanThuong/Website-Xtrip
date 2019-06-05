import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DeviceService, TourReservation} from '../../../../common';
import {AppBase} from '../../../../app.base';
import {BOOKING_STATUS} from '../../../../app.constants';

@Component({
  selector: 'tour-booking-detail-item',
  templateUrl: './tour-detail-item.component.html',
  styleUrls: ['tour-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourBookingDetailItem extends AppBase {

  @Input() tour: TourReservation = new TourReservation();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  STATUS: any = BOOKING_STATUS;

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  //get text payment status
  getTextPaymentStatus(status) {
    return this.utilityHelper.getPaymentStatusText(status);
  }

  //get icon payment status
  getIconPaymentStatus(status) {
    return this.utilityHelper.getColorPaymentStatus(status);
  }

  // fn on open booking detail
  onOpenBookingDetail = (): void => {
    this.select.emit();
  };
  
}
