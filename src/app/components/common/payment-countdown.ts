import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {AppBase} from '../../app.base';

@Component({
  selector: 'payment-countdown',
  template: `
    <span class="countdown">{{ result }}</span>
  `,
})
export class PaymentCountdown extends AppBase {

  @Input() time: any; // expired date
  @Input() format: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  result: string = '00h 00m';
  timer: any = null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.countdown();
  }

  ngAfterViewInit() {
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  // fn countdown
  countdown() {

    let now = moment();
    let expired = !!this.format ? moment(this.time) : moment(this.time, this.format);
    let diff = expired.diff(now, 'seconds');

    if (diff <= 0) {
      clearInterval(this.timer);
      this.onSubmit();
      this.result = '00h 00m';
      return;
    }

    let hour = Math.floor(diff / (60 * 60));
    let minute = Math.floor((diff % (60 * 60)) / 60);

    this.result = `${this.utilityHelper.pad(hour)}h ${this.utilityHelper.pad(minute)}m`;
  }

  onSubmit() {
    this.submit.emit();
  }
}
