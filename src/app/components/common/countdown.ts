import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {UtilityHelper} from '../../common/helpers';
import {AppBase} from "../../app.base";

@Component({
  selector: 'countdown',
  template: `
    <span class="countdown {{ class }}">{{ result }}</span>
  `
})
export class Countdown extends AppBase{

  @Input() time: any; // expired date
  @Input() format: string = 'DD/MM/YYYY';
  @Output() submit: EventEmitter<any> = new EventEmitter();
  result: string = '00:00:00';
  timer: any = null;
  utils = new UtilityHelper();

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
    let expired = !!this.format ? moment(this.time || '') : moment(this.time || '', this.format);
    let diff = expired.diff(now, 'seconds');

    if (diff <= 0) {
      clearInterval(this.timer);
      this.onSubmit();
      this.result = '00:00:00';
      return;
    }

    this.result = this.utilityHelper.hourFormat(diff);
  }


  onSubmit() {
    this.submit.emit();
  }
}
