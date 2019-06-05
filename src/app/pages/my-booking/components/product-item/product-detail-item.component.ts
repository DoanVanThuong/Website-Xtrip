import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DeviceService, ProductReservation} from '../../../../common';
import {AppBase} from '../../../../app.base';
import {BOOKING_STATUS} from '../../../../app.constants';

@Component({
  selector: 'product-booking-detail-item',
  templateUrl: './product-detail-item.component.html',
  styleUrls: ['product-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProductBookingDetailItem extends AppBase {

  @Input() product: ProductReservation = new ProductReservation();
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
