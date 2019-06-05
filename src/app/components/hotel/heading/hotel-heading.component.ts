import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'hotel-heading',
  templateUrl: './hotel-heading.component.html',
  styleUrls: ['./hotel-heading.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelHeading {

  @Input('options') options: any = {};

  constructor() { }
 
}