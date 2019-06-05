import {Component, Input, ViewEncapsulation} from '@angular/core';
import { AppBase } from '../../../app.base';
@Component({
  selector: 'hotel-detail-item',
  templateUrl: './hotel-detail-item.component.html',
  styleUrls: ['./hotel-detail-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelDetailItem extends AppBase {

  @Input('hotel') hotel: any;
  @Input('nights') nights: any;
  @Input('viewMode') viewMode: any; //1: search hotel, 2: preferential hotels

  numberNights = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    this.numberNights = this.nights;
  }

}