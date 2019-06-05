import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppBase } from '../../../app.base';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <a class="pointer"
         (click)="count(-1)"
         [attr.disabled]="value === min ? 'disabled' : ''">
        <img alt="minus" [src]="iconMinus"/>
      </a>
      <span class="counter-value">{{ value }}</span>
      <a class="pointer" (click)="count(1)"
         [attr.disabled]="value === max ? 'disabled' : ''">
        <img alt="plus" [src]="iconAdd"/>
      </a>
    </div>
  `,
  styleUrls: [
    './counter.component.less'
  ],
})
export class CounterComponent extends AppBase {

  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 99;
  @Input('error') errorMessage: string = '';
  @Input() iconAdd: string = 'assets/images/icon/icon-plus-circle.svg';
  @Input() iconMinus: string = 'assets/images/icon/icon-minus-circle.svg';
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Output() ValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _toastr: ToastrService) {
    super();
  }

  ngOnChanges() {


    if (typeof this.value === 'string') {
      this.value = Number(this.value) || 0;
    }

    if (!!this.min && this.value < this.min) {
      this.value = this.min;
      this.onChange();
    } else if (!!this.max && this.value > this.max) {
      this.value = this.max;
      this.onChange();
    }

  }

  // fn count
  count = (offset: number = 1): void => {
    this.value += offset;

    if (Number(this.value) < Number(this.min) || Number(this.value) > Number(this.max)) {

      if (Number(this.value) > Number(this.max)) {
        if (!!this.errorMessage) {
          this._toastr.error(this.errorMessage, null, {
            positionClass: 'toast-top-right'
          });
        }
      }

      this.value -= offset;
      return;
    }

    this.onChange();
  };

  // fn on change
  onChange = (): void => {
    this.change.emit(this.value);
  };
}