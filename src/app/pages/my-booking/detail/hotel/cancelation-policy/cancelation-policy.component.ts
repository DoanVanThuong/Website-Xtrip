import { Component, ViewEncapsulation } from '@angular/core';
import { AppPage } from '../../../../../app.base';
import { CSTORAGE } from '../../../../../app.constants';
import { HotelRepo, BookingRepo } from '../../../../../common/repos';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../../common/services';
import { HotelReservation } from '../../../../../common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Location } from '@angular/common';

const HOTEL = makeStateKey('BOOKING_HOTEL');

@Component({
  selector: 'app-booking-hotel-cancelation-policy',
  templateUrl: './cancelation-policy.component.html'
})
export class BookingHotelCancelationPolicyComponent extends AppPage {

  code: string = '';
  hotel: HotelReservation = null;

  intro: string = '';
  policies: Array<string> = [];
  facilities: Array<any> = [];

  constructor(private _activatedRoute: ActivatedRoute,
    private _storage: StorageService,
    private _hotelRepo: HotelRepo,
    private _transferState: TransferState,
    private _bookingRepo: BookingRepo,
  private _location: Location) {
    super();
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;
      this.getHotel(this.code);
    });
  }

  back(){
    this._location.back();
  }

  // fn get detail
  getHotel = (code: string = '') => {

    const hotel = this._transferState.get(HOTEL, null);

    if (!!hotel) {
      this.hotel = new HotelReservation(hotel);
    } else {

      return this._bookingRepo
        .getBookedHotelDetail(code)
        .then(
          (res: any) => {
            this.hotel = new HotelReservation(res.data);
          },
          (errors: any) => {
            this.intro = '';
          }
        );
    }
  };

}