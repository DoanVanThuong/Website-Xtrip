import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {GlobalState} from "../../global.state";

@Directive({
  selector: '[booking-step]'
})
export class BookingStepDirective implements OnInit {

  ele: any;
  @Input('booking-step') step: number = 0;

  constructor(private el: ElementRef,
              private _state: GlobalState) {
    this.ele = this.el.nativeElement;

  }

  ngOnInit(): void {
    if (!!this.step) {
      this._state.notifyTo('booking:mode', Number(this.step));
    }
  }
}
