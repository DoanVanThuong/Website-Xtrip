import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DeviceService, HotelReservation} from '../../../../common';
import {AppBase} from '../../../../app.base';
import {BOOKING_STATUS} from '../../../../app.constants';

@Component({
  selector: 'my-booking-hotel-item',
  templateUrl: './hotel-detail-item.component.html',
  styleUrls: ['hotel-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelBookingDetailItem extends AppBase {

  @Input() hotel: HotelReservation = new HotelReservation();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  STATUS: any = BOOKING_STATUS;

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  //get text current payment status
  getTextPaymentStatus(status) {
    return this.utilityHelper.getPaymentStatusText(status);
  }
}
