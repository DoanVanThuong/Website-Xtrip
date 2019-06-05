import {Component, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {Router} from '@angular/router';
import {BookingRepo, DeviceService, HotelReservation, StorageService} from '../../../../../common/index';
import {CSTORAGE, EVENT} from '../../../../../app.constants';
import {GlobalState} from '../../../../../global.state';

@Component({
  selector: 'booked-hotel',
  templateUrl: './hotel-booked.component.html',
  styleUrls: ['./hotel-booked.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HotelBookedComponent extends AppPage {

  isLoading: boolean = false;

  // tours list
  hotels: Array<HotelReservation> = [];

  constructor(private _router: Router,
              private _state: GlobalState,
              protected _device: DeviceService,
              private _bookingRepo: BookingRepo,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.getBookedHotels();

    this._state.subscribe([
      EVENT.BOOKING_SYNCED,
      EVENT.LOGGED_IN
    ], (value: boolean = false) => {
      if (value) {
        this.offset = 0;
        this.hotels = [];
        this.getBookedHotels();
      }
    });
  }

  ngAfterViewInit() {
  }

  // scroll down
  onScrollDown() {
    if (!this.isLoading && this.hotels.length > 0) {
      this.offset += this.limit;
      this.getBookedHotels();
    }
  }

  // fn get my room booking
  getBookedHotels() {

    this.isLoading = true;

    return this._bookingRepo
      .getBookedHotels(this.offset, this.limit)
      .then(
        (res: any) => {

          this.isLoading = false;
          this.hotels = this.hotels.concat(res.data.reservations.map(reservation => new HotelReservation(reservation)));

          if (!res.data.reservations.length) {
            this.offset -= this.limit;
          }
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  }

  // fn on open detail
  openDetail = (hotel: any) => {

    this._storage.setItem(CSTORAGE.BOOKED_HOTEL, hotel);
    this._router.navigate(['/my-booking/hotel/' + hotel.code]);
  };

  //fn search hotel
  searchHotel() {
    this._router.navigate(['/hotel/search']);
  }
}
