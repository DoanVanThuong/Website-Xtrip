import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {Airline, Airport, DeviceService, FlightReservation} from '../../../../common';
import {AppBase} from '../../../../app.base';
import {BOOKING_STATUS} from '../../../../app.constants';
import * as _ from 'lodash';

@Component({
  selector: 'my-booking-flight-detail-item',
  templateUrl: './flight-detail-item.component.html',
  styleUrls: ['./flight-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MyBookingFlightDetailItem extends AppBase {

  @Input() class: string = '';
  @Input() flight: FlightReservation = new FlightReservation();
  @Input() airports: Airport[] = [];
  @Input() airlines: Airline[] = [];

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  STATUS: any = BOOKING_STATUS;

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  // fn get airport
  getAirlineWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airlines, 'code', field || 'name');
  };

  // fn get airport
  getAirportWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field || 'name');
  };

  //get text current payment status
  getTextPaymentStatus(status) {
    return this.utilityHelper.getPaymentStatusText(status);
  }

  // fn on open booking detail
  onOpenBookingDetail = (): void => {
    this.select.emit();
  };
}
