import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from 'app/app.base';
import { Hotel, StorageService } from 'app/common';

@Component({
  selector: 'app-hotel-detail-item-desktop',
  templateUrl: './hotel-detail-desktop.html',
  styleUrls: ['./hotel-detail-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelDetailItemDesktopComponent extends AppBase {

  @Input() hotel: Hotel = new Hotel();
  @Input() nights: number = 0;
  @Input() params: any = {};

  @Input() hotelSearch: any = {};
  @Input() viewMode: string = 'list' //list, grid

  constructor(
    private _storage: StorageService
  ) {
    super();
  }

  //fn get detail
  onGetDetail = (hotel: Hotel) => {
    this._storage.setItem(this.CSTORAGE.HOTEL, hotel);
  };

  // fn generate params request
  onGenerateParameters = (hotel: Hotel) => {
    return this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
      name: hotel.name,
      code: hotel.code
    }));
  };

}



