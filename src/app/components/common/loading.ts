import {Component, Input} from '@angular/core';
import {AppBase} from "../../app.base";

@Component({
  selector: 'loading',
  template: `
    <div class="text-center m-t-20 m-b-20 {{ class }}" *ngIf="isShow">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="font-18 font-medium" *ngIf="!!title">{{ title }}</div>
      <div class="font-16 font-normal" *ngIf="!!description">{{ description }}</div>
    </div>
  `
})
export class Loading extends AppBase {

  @Input('show') isShow: boolean = false; //
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() {
    super();
  }
}
