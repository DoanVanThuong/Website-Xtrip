import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { HotelRepo, HotelSearch, StorageService, Hotel } from '../../../../../common';
import { Router } from '@angular/router';
import { CSTORAGE } from '../../../../../app.constants';

@Component({
  selector: 'app-hotel-equivalent-desktop',
  templateUrl: './hotel-equivalent.component.html',
  styleUrls: ['hotel-equivalent.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelEquivalentDesktopComponent {

  @Input('code') code: string = '';
  @Input('searchInfo') searchInfo: any = {};
  @Input('params') params: any = {};

  equivalentHotels: Array<any> = [];
  nights: number = 0;

  constructor(
    protected _hotelRepo: HotelRepo,
    private _router: Router,
    private _storage: StorageService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getEquivalentHotel(this.code, this.searchInfo);
  }

  // fn get equivalent hotels
  getEquivalentHotel(code: string = '', data: any = {}) {
    let searchParam = Object.assign({}, data, { hotelCode: code });
    return this._hotelRepo
      .getEquivalentHotels(searchParam)
      .then(
        (res: any) => {
          this.equivalentHotels = res.data.hotels;
          this.nights = res.data.nights;
        }
      );
  }

  //goto hotel
  onClickDetail(hotel: Hotel) {
    this._storage.setItem(CSTORAGE.HOTEL, hotel);
  }

  //genQueryParams
  genQueryParams(hotel) {
    return Object.assign({}, this.params, {code: hotel.code, name: hotel.name})
  }

}