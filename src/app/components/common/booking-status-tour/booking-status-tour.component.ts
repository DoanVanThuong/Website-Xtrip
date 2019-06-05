import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BOOKING_STATUS} from '../../../app.constants';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'booking-status-tour',
  template: `
    <div class="status d-inline-block"
         [class.status-badge]="isFill"
         [class.status-box]="isBorder"
         [class.status-paid]="status === STATUS.PAID"
         [class.status-deposit]="status === STATUS.DEPOSIT"
         [class.status-unpaid]="status === STATUS.UNPAID"
         [class.status-cancel]="status === STATUS.CANCEL"
         [class.status-waiting]="status === STATUS.WAITING"
         [class.status-pending]="status === STATUS.PENDING">
      <img class="m-t-n-2 size-12x12"
           *ngIf="isIcon"
           cdn-src="assets/images/icon/{{ utilityHelper.getColorPaymentStatus(status) }}.svg"
           alt="icon"/>
      {{ statusName }}
    </div>
  `
})
export class BookingStatusTourComponent extends AppBase {

  @Input('') status: number = 0;
  @Input('') statusName: string = '';
  @Input('fill') isFill: boolean = false;
  @Input('border') isBorder: boolean = false;
  @Input('icon') isIcon: boolean = false;

  STATUS: any = BOOKING_STATUS;

  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {

  }
}
