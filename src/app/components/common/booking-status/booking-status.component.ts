import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BOOKING_STATUS} from '../../../app.constants';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'booking-status',
  template: `
    <div class="status d-inline-block {{ class }}"
         [class.status-badge]="isFill"
         [class.status-box]="isBorder"
         [class.status-paid]="status === STATUS.PAID"
         [class.status-unpaid]="status === STATUS.UNPAID"
         [class.status-cancel]="status === STATUS.CANCEL"
         [class.status-waiting]="status === STATUS.WAITING"
         [class.status-pending]="status === STATUS.PENDING">
      <img class="m-t-n-3 size-12x12"
           *ngIf="isIcon"
           cdn-src="assets/images/icon/{{ utilityHelper.getColorPaymentStatus(status) }}.svg"
           alt="icon"/>
      {{ utilityHelper.getPaymentStatusText(status) }}
    </div>
  `,
  styleUrls: [
    './booking-status.component.less'
  ]
})
export class BookingStatusComponent extends AppBase {

  @Input('') status: number = 0;
  @Input('') class: string = '';
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
