import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {AppPage} from '../../../app.base';
import {Hotel} from '../../../common/entities';
import {CAPP} from '../../../app.constants';

@Component({
  selector: 'hotel-item-desktop',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['hotel-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelItemComponent extends AppPage {

  @Input() hotel: Hotel = new Hotel();
  @Input() params: any = {};
  @Input('desktop') isDesktopMode: boolean = true;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _router: Router) {
    super();
  }

  // fn generate parameter
  generateHotelParameters = (): any => {

    return this.utilityHelper.buildQueryParams(Object.assign({}, this.params, {
      name: this.hotel.name,
      code: this.hotel.code,
      checkIn: moment(this.params.checkIn).format(CAPP.DATE_FORMAT_VALUE),
      checkOut: moment(this.params.checkOut).format(CAPP.DATE_FORMAT_VALUE),
      latitude: this.hotel.latitude,
      longitude: this.hotel.longitude,
      destinationCode: this.hotel.destination.code
    }));
  };
}