import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../../../app.base';
import {
  Airline,
  Airport,
  BookingRepo,
  DeviceService,
  FlightReservation,
  StorageService
} from '../../../../../common';
import {CSTORAGE, EVENT} from '../../../../../app.constants';
import {GlobalState} from '../../../../../global.state';
import * as _ from 'lodash';
import {animate, animateChild, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'booked-flight',
  templateUrl: './flight-booked.component.html',
  styleUrls: ['./flight-booked.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), {optional: true})
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class FlightBookedComponent extends AppPage {

  isLoading = false;
  flights: FlightReservation[] = [];
  airports: Airport[] = [];
  airlines: Airline[] = [];

  limit: number = 20;

  constructor(private _router: Router,
              private _state: GlobalState,
              protected _device: DeviceService,
              private _bookingRepo: BookingRepo,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(_device);

    this.airlines = this._storage.getItem(CSTORAGE.CARRIER) || [];
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT) || [];
  }

  ngOnInit() {

    this.getBookingFlights();

    this._state
      .subscribe([
        EVENT.BOOKING_SYNCED,
        EVENT.LOGGED_IN
      ], (value: boolean = false) => {
        if (value) {
          this.offset = 0;
          this.flights = [];
          this.getBookingFlights();
        }
      });
  }

  // load more event
  onScrollDown() {
    if (!this.isLoading && this.flights.length > 0) {
      this.offset += this.limit;
      this.getBookingFlights();
    }
  }

  // fn get booked flight
  getBookingFlights() {

    this.isLoading = this.offset < 10;

    return this._bookingRepo
      .getBookedFlights(this.offset, this.limit)
      .then(
        (res: any) => {

          this.isLoading = false;

          // handle airport
          res.data.airports.map(airport => {

            let index = this.utilityHelper.findInListBy(airport.code, this.airports);
            if (!index) {
              this.airports.push(new Airport(airport));
            }
          });

          // handle airlines
          res.data.airlines.map(airline => {
            let index = this.utilityHelper.findInListBy(airline.code, this.airlines);
            if (!index) {
              this.airlines.push(new Airline(airline));
            }
          });

          this._storage.setItem(CSTORAGE.AIRPORT, this.airports);
          this._storage.setItem(CSTORAGE.CARRIER, this.airlines);

          // push reservation list
          this.flights = this.flights.concat(res.data.reservations.map((flight) => {

            flight.segments = flight.segments.map(segment => {
              segment.airline = _.find(this.airlines, (item: any) => {
                return item.code === segment.carrier;
              });
              return segment;
            });

            return new FlightReservation(flight);
          }));

          if (!res.data.reservations.length) {
            this.offset -= this.limit;
          }
        },
        (errors: any) => {
          this.isLoading = false;
        }
      );
  }

  //go to detail booked flight
  gotoDetail(data) {

    this._router.navigate(['/my-booking/flight/' + data.code]);
  }

  //go to result page when list booking flight is empty
  bookFlightNow() {
    this._router.navigate(['/flight/search']);
  }

  //on expired time
  onExpired = () => {

  };

}
