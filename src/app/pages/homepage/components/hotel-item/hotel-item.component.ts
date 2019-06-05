import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {Router} from '@angular/router';
import {FreeTourHotelItem, Hotel} from '../../../../common/entities';
import * as moment from 'moment';
import {StorageService} from '../../../../common/services';
import {CAPP, CSTORAGE} from '../../../../app.constants';

@Component({
  selector: 'home-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHotelItemComponent extends AppPage {

  @Input() hotel: FreeTourHotelItem = new FreeTourHotelItem();
  @Input() params: any = {};
  @Input() queryParams: any = {};

  constructor(private _router: Router,
              private _storage: StorageService) {
    super();
  }

  // fn generate query params
  generateQueryParameters = (): any => {

    return this.utilityHelper.buildQueryParams(Object.assign({}, this.queryParams));
  };

  // on select hotel
  onSelectHotel = (hotel: FreeTourHotelItem): void => {
    this._storage.setItem(CSTORAGE.HOTEL, hotel);
  }
}
