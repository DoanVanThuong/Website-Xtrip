import {Component} from '@angular/core';
import {AppPage} from '../../../../../app.base';
import {Router} from '@angular/router';
import {BookingRepo, DeviceService, StorageService, TourReservation} from '../../../../../common/index';
import {CSTORAGE, EVENT, TOUR_TYPE} from '../../../../../app.constants';
import {GlobalState} from '../../../../../global.state';

@Component({
  selector: 'booked-tour',
  templateUrl: './tour-booked.component.html'
})
export class TourBookedComponent extends AppPage {

  isLoading: boolean = false;

  // tours list
  tours: Array<TourReservation> = [];

  constructor(private _router: Router,
              private _state: GlobalState,
              private _bookingRepo: BookingRepo,
              private _storage: StorageService,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.getBookedTours();

    this._state.subscribe([
      EVENT.BOOKING_SYNCED,
      EVENT.LOGGED_IN
    ], (value: boolean = false) => {
      if (value) {
        this.offset = 0;
        this.tours = [];
        this.getBookedTours();
      }
    });
  }

  ngAfterViewInit() {
  }

  // fn scroll down
  onScrollDown() {
    if (!this.isLoading && this.tours.length > 0) {
      this.offset += this.limit;
      this.getBookedTours();
    }
  }

  // fn get my tour booking
  getBookedTours() {

    this.isLoading = true;

    return this._bookingRepo
      .getBookedTours(this.offset, this.limit)
      .then(
        (res: any) => {

          this.isLoading = false;
          this.tours = this.tours.concat(res.data.reservations.map(tour => new TourReservation(tour)));

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
  openDetail = (tour: any) => {

    this._storage.setItem(CSTORAGE.BOOKED_TOUR, tour);
    this._router.navigate(['/my-booking/tour/' + tour.code]);
  };

  //fn search tour
  searchTour() {
    this._router.navigate(['/tour/arrival', TOUR_TYPE.INTERNATIONAL]);
  }
}
