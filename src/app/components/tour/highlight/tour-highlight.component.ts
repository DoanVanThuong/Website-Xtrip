import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppBase } from 'app/app.base';

@Component({
  selector: 'app-tour-highlight',
  template: `
  <div class="tour-highlight-page" *ngIf="!!data && !!data.length">
    <ul class="highlight"
      [class.d-flex]="mode == 'break'"
      [class.flex-wrap]="mode == 'break'"
      [class.over-hidden]="mode == 'hidden'"
      [class.over-scroll]="mode == 'scroll'">
      <li class="highlight-item m-r-10" [class.m-t-5]="mode == 'break'" *ngFor="let item of data | slice : 0 : !!length ? length : data.length">{{ item }}</li>
    </ul>
  </div>
  `,
  styleUrls: [`./tour-highlight.component.less`],
  encapsulation: ViewEncapsulation.None
})
export class TourHighlightComponent extends AppBase {
  
  constructor() { super() }
  
  @Input() data: any;
  @Input() length: number = 0;
  @Input() mode: ''; // scroll | break | hidden

}
