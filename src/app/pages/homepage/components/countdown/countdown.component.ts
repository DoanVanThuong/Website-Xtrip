import {Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {AppBase} from '../../../../app.base';
import * as moment from 'moment';

@Component({
  selector: 'home-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCountdownComponent extends AppBase {

  @Input() time: any = moment();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  result: string = '';
  timer: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.onCountdown();
    }, 1000);
  }

  // on count down
  onCountdown = (): void => {


    let expired = moment(this.time);
    let diff = expired.diff(moment(), 'seconds');

    if (diff <= 0) {
      clearInterval(this.timer);
      this.onSubmit();
      return;
    }

    this.result = this.bindTime(diff);
  };

  // fn bind time
  bindTime = (time: number = 0): string => {

    let timeline: string = '';

    const h: number = 60 * 60;
    const d: number = h * 24;

    let day = Math.floor(time / d);
    time = Math.floor(time % d);
    let hour = Math.floor(time / h);
    let minute = Math.floor((time % h) / 60);
    let second = Math.floor((time % h) % 60);

    if (day > 0) {
      timeline += `${day} ngày `;
    }

    return timeline + `${hour < 10 ? ('0' + hour) : hour}:${minute < 10 ? ('0' + minute) : minute}:${second < 10 ? ('0' + second) : second}`;
  };

  // fn on submit when timeout
  onSubmit = (): void => {
    this.submit.emit();
  }
}
