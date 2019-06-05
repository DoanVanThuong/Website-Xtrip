import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from 'app/app.base';

@Component({
  selector: 'app-tour-surcharge',
  templateUrl: './tour-surcharge.component.html',
  styleUrls: ['./tour-surcharge.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourSurcharge extends AppBase {

  @Input() data: any = [];

  constructor(
    
  ) { super(); }

}
