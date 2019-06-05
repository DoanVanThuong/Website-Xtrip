import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';

@Component({
  selector: 'stepper-booking',
  templateUrl: './stepper-booking.html',
  styleUrls: ['./stepper-booking.less'],
  encapsulation: ViewEncapsulation.None
})

export class StepperBooking extends AppPage {
  @Input() mode: string = 'auto'; //input -> 'auto': 3 step; 'tour': 2 step;
  @Input() steps: Array<string> = [];
  @Input() step: number = 1;

  constructor() {
    super();
  }

  ngOnInit() {
    this.steps = this.mode === 'auto' ? ['Đặt chỗ', 'Xem lại', 'Thanh toán'] : ['Đặt chỗ', 'Thanh toán'];
  }
}