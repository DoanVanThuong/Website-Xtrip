import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {FlightResultMobileComponent} from '../mobile/flight-result-mobile.component';
import {BookingFlight, Flight, FlightFilter, FlightSearch} from '../../../../common';
import {CSTORAGE} from '../../../../app.constants';
import {NavigationEnd} from '@angular/router';
import {animate, animateChild, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-flight-result-desktop',
  templateUrl: './flight-result-desktop.component.html',
  styleUrls: ['./flight-result-desktop.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@item', stagger(80, animateChild()), { optional: true })
      ]),
    ]),
    trigger('item', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class FlightResultDesktopComponent extends FlightResultMobileComponent {

  // update to direction code
  isReturnTurn: boolean = true;
  departTicket: Flight = new Flight();

  navigationSubscription: any;

  ngOnInit() {

    this.navigationSubscription = this._router.events.subscribe((e: any) => {

      if (e instanceof NavigationEnd) {
        this.flights = [];
        this.tempFlights = [];
        this.carriers = [];
        this.airports = [];

        this.filter = {};
      }
    });

    this._activatedRoute
      .queryParams
      .subscribe((params) => {
        this.params = params;

        this.handleRouteParams(params);

        this.getFlights(this.flightSearch);
        this.findDepartFlight(this.flightSearch.DirectionCode);
      });
  }

  ngAfterViewInit() {
  }

  // fn set and detect depart ticket
  findDepartFlight = (DirectionCode: number = 2) => {

    this.isReturnTurn = !!DirectionCode && DirectionCode == 2;

    if (this.isReturnTurn) {
      // depart turn
      this.departTicket = new Flight(this._storage.getItem(CSTORAGE.FLIGHT_2WAY1) || {});
    }
  };

  // fn on select sort
  onSelectSort = ($event: any): void => {

    this.filter.sort = $event;
    this.onSubmitFilter(this.filter);
  };

  // fn on select flight
  onSelectFlight = (flight: Flight): void => {

    // TODO store flight
    if (!this.isReturnTurn) {

      this._storage.setItem(CSTORAGE.FLIGHT_2WAY1, flight);
      this._storage.setItem(CSTORAGE.FLIGHT_BOOKING_MODE, this.isRoundTrip ? 2 : 1);
      this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, new BookingFlight(this.flightSearch));

    } else {
      this._storage.setItem(CSTORAGE.FLIGHT_2WAY2, flight);
    }

    // detect logic to select return-way or not
    if (this.isRoundTrip) {

      if (!this.isReturnTurn) {

        // reset current data
        this.flights = [];
        this.filter = new FlightFilter();

        this.updateParamsToRoute({
          DirectionCode: 2,
          SelectDepartValue: flight.groupValue,
          Origin: this.flightSearch.Destination,
          Destination: this.flightSearch.Origin
        });

      } else {

        this._router.navigate(['/flight/booking']);
      }

    } else {

      this._router.navigate(['/flight/booking']);
    }
  };

  // fn back to select depart way
  backToDepartWay = () => {

    this.flights = [];
    this.filter = new FlightFilter();

    this._location.back();
  };

}
