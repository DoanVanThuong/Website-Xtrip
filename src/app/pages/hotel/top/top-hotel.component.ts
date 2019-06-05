import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import * as moment from 'moment';
import {CSTORAGE} from '../../../app.constants';
import {Hotel, HotelRepo, StorageService} from '../../../common';
import {AppBase} from "../../../app.base";

@Component({
  selector: 'app-top-hotel',
  templateUrl: './top-hotel.component.html',
  styleUrls: [
    './top-hotel.component.less',
    '../result/mobile/hotel-result-mobile.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})

export class HotelTopComponent extends AppBase {

  isLoading: boolean = false;

  hotels: Hotel[] = [];
  nights = 0;

  parameters: any = {};

  constructor(
    private _router: Router,
    private hotelRepo: HotelRepo,
    private _storage: StorageService
  ) {
    super();
  }

  ngOnInit() {
    this.getHotels();
  }

  //get Preferential Hotels
  getHotels() {
    this.isLoading = true;

    return this.hotelRepo
      .getPreferentialHotels(this.offset, this.limit)
      .then(
        (res: any) => {

          this.hotels = res.data.hotels.map(hotel => new Hotel(hotel));
          this.nights = moment(res.data.parameters.checkOut).diff(res.data.parameters.checkIn, 'days');
          this.parameters = res.data.parameters;
          this.isLoading = false;
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  }

  //on click detail hotel 
  onSelectHotel(hotel) {
    this._storage.setItem(CSTORAGE.HOTEL, hotel);
    this._router.navigate([`/hotel/${hotel.code}/detail`], {
      queryParams: {
        checkIn: moment(new Date(this.parameters.checkIn)).format('YYYY-MM-DD'),
        checkOut: moment(new Date(this.parameters.checkIn)).add(moment(this.parameters.checkOut).diff(this.parameters.checkIn, 'days'), 'd').format('YYYY-MM-DD'),
        adults: this.parameters.adults,
        rooms: this.parameters.rooms
      }
    });
  }

}
