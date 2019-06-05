import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService, Flight} from '../../../common';
import {CSTORAGE} from '../../../app.constants';
import {AppBase} from '../../../app.base';

@Component({
  selector: 'flight-pre-booking',
  templateUrl: './flight-pre-booking.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FlightPreBookingComponent extends AppBase {

  flights: Flight[] = [];
  mode: number = 1;

  constructor(public _router: Router,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this.mode = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING_MODE);

    if (this.mode === null) {
      this._router.navigate(['/flight/search']);
    }

    this.getFlightDetail();
  }

  //get detail flight data
  getFlightDetail() {
    let flight1 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1) || this._router.navigate(['/flight/search']);
    this.flights.push(new Flight(flight1));

    if (Number(this.mode) === 2) {
      let flight2 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY2);
      this.flights.push(new Flight(flight2));
    }
  }

  // fn booking flight
  bookingFlight() {
    this._router.navigate(['/flight/booking']);
  }

}
