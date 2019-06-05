import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CSTORAGE, FLIGHT_FILTER} from '../../../../app.constants';
import {
  Flight,
  StorageService,
  PlaneTicketRepo,
  FlightSearch,
  BookingFlight,
  Airport,
  Carrier
} from '../../../../common/index';
import * as moment from 'moment';
import {AppBase} from '../../../../app.base';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {FlightFilterPopup} from '../../../../components/';
import {ProgressBar} from './../../components/progress-bar/progress-bar.component';
import {ToastrService} from 'ngx-toastr';
import {GlobalState} from '../../../../global.state';
import {Location} from '@angular/common';

@Component({
  selector: 'app-flight-result-mobile',
  templateUrl: './flight-result-mobile.component.html',
  styleUrls: ['./flight-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightResultMobileComponent extends AppBase {

  @ViewChild(ProgressBar) processBar: ProgressBar;
  @ViewChild(FlightFilterPopup) flightFilterPopup: FlightFilterPopup;

  isLoading: boolean = false;
  isRoundTrip: boolean = false;
  flightSearch: FlightSearch = new FlightSearch();

  tempFlights: Array<Flight> = [];

  params: any = {};

  flights: Array<Flight> = [];

  carriers: Array<Carrier> = [];
  airports: Array<Airport> = [];

  isEmptyData: boolean;

  isbackflightcheap = '0';

  // heading
  header: any = {
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    adult: 0,
    children: 0,
    baby: 0
  };

  filterCounter: number = 0;
  filter: any = {};
  originalOptions: any = null;

  isDone = false;
  navigationSubscription: any = null;

  constructor(public _activatedRoute: ActivatedRoute,
              public _state: GlobalState,
              protected _storage: StorageService,
              public _router: Router,
              protected _pTicketRepo: PlaneTicketRepo,
              protected _toastr: ToastrService,
              protected _location: Location) {
    super();


    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.carriers = this._storage.getItem(CSTORAGE.CARRIER) || [];
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT) || [];
  }

  ngOnInit() {

    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.flights = [];
        this.tempFlights = [];
        this.carriers = [];
        this.airports = [];
      }
    });

    this._activatedRoute.queryParams.subscribe((params) => {
      this.params = params;

      // reset data
      this.flights = [];
      this.tempFlights = [];

      if (this.isEmptyQueryParams(params)) {
        this._router.navigate(['/flight/search']);
        return;
      }

      this.handleRouteParams(params);
      this.getFlights(this.flightSearch);
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    this._storage.removeItem(CSTORAGE.FILTER_DATA);
  }

  // fn handle route params
  handleRouteParams = (params: any): void => {

    this.header = {
      origin: params.Origin,
      destination: params.Destination,
      departDate: params.DepartDate,
      returnDate: params.ReturnDate,
      adult: Number(params.Adult),
      children: Number(params.Child),
      baby: Number(params.Infant)
    };

    this.isRoundTrip = params.RoundTrip == 'true';
    this.isbackflightcheap = params.isbackflightcheap;

    this.flightSearch = new FlightSearch(Object.assign({}, params, {
      RoundTrip: this.isRoundTrip,
      Cheap: params.Cheap == 'true'
    }));

    this.handleFilter(params);
  };

  // fn hashing filter-popup-popup from query params;
  handleFilter = (params: any): void => {

    for (let key in params) {

      let value = params[key];

      switch (key.toLowerCase()) {
        case 'sort': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'carriers':
        case 'landing':
        case 'depart':
        case 'points': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
      }
    }
  };

  // fn detect empty query params
  isEmptyQueryParams(params: any = {}) {
    return (!params || !params.Origin || !params.Destination || !params.DepartDate);
  }

  // fn result flights
  getFlights(params: any = {}) {

    if (this.processBar) {
      this.processBar.start();
    }
    this.isLoading = true;

    this._pTicketRepo
      .searchFlight(params)
      .then(
        (res: any) => {

          if (!!res.options) {

            // store temp data for filter-popup-popup
            this.tempFlights = this.tempFlights.concat(res.options.map(flight => new Flight(flight)));

            this._storage.setItem(CSTORAGE.FILTER_DATA, this.tempFlights);

            // handle data list
            this.flights = this.tempFlights;

            //hàm kiểm tra nếu vé khứ hồi đi và về cùng 1 ngày thì giờ khởi hành (chiều đi) phải > giờ hạ cánh (chiều về)
            this.flights = this.checkOnDaysFlight(this.flightSearch, this.flights);

            // filter-popup-popup with params which get from route
            this.onFilterWith();

            // handle carrier/aiport
            res.data.airport.map(airport => {

              let index = this.utilityHelper.findInListBy(airport.code, this.airports);
              if (!index) {
                this.airports.push(airport);
              }
            });

            res.data.carrier.map(carrier => {
              let index = this.utilityHelper.findInListBy(carrier.code, this.carriers);
              if (!index) {
                this.carriers.push(carrier);
              }
            });

            this._storage.setItem(CSTORAGE.AIRPORT, this.airports);
            this._storage.setItem(CSTORAGE.CARRIER, this.carriers);

            this._state.notifyDataChanged('carriers:updated', this.carriers);
            this._state.notifyDataChanged('airports:updated', this.airports);
          }

          // update filter-popup
          this._state.notifyDataChanged('flights:loaded', true);

          if (res.nextRequest !== null) {

            this.getFlights(Object.assign({}, params, {
              nextRequest: res.nextRequest,
              requestId: res.requestId
            }));

          } else {

            if (this.processBar) {
              this.processBar.complete();
            }

            this.isLoading = false;
            this.isDone = true;
            this.isEmptyData = !this.flights.length;
          }
        }
      );
  }

  //check depart - landing flight in a day
  checkOnDaysFlight(params: any = {}, flights: Array<Flight> = []) {

    if (params.RoundTrip && params.DirectionCode === 2) {
      let currentFlight = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1);

      return _.filter(flights, (flight) => {
        return flight.departTime > currentFlight.landingTime;
      });
    }
    else {
      return flights;
    }

  }

  // fn select an flight
  onSelectFlight = (flight: Flight): void => {

    // TODO store flight
    this._storage.setItem(CSTORAGE.FLIGHT_2WAY1, flight);
    this._storage.setItem(CSTORAGE.FLIGHT_BOOKING_MODE, this.isRoundTrip ? 2 : 1);
    this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, new BookingFlight({
      Adult: this.flightSearch.Adult,
      Child: this.flightSearch.Child,
      Infant: this.flightSearch.Infant,
    }));
    this.setPassenger();

    if (this.isRoundTrip) {

      this._router.navigate(['/flight/result/return-way'], {
        queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.flightSearch, {
          SelectDepartValue: flight.groupValue,
          DirectionCode: 2,
          Origin: this.flightSearch.Destination,
          Destination: this.flightSearch.Origin,
        }))
      });

    } else {
      //case 1 wayclass="btn btn-block btn-baggage dropdown-toggle"
      this._router.navigate(['/flight/preview']);
    }
  };

  // fn set passenger
  setPassenger = () => {
    const numberAdult = (this.flightSearch.Adult > 0) ? Array(this.flightSearch.Adult).fill(0).map((x, i) => i) : [];
    const numberChild = (this.flightSearch.Child > 0) ? Array(this.flightSearch.Child).fill(0).map((x, i) => i) : [];
    const numberInfant = (this.flightSearch.Infant > 0) ? Array(this.flightSearch.Infant).fill(0).map((x, i) => i) : [];

    this._storage.setItem(CSTORAGE.PASSENGER, {
      arrayNumberPassenger: [<number>this.flightSearch.Adult, <number>this.flightSearch.Child, <number>this.flightSearch.Infant],
      passengers: [
        {type: 'adult', typeName: 'Người lớn', number: numberAdult, data: []},
        {type: 'child', typeName: 'Trẻ em', number: numberChild, data: []},
        {type: 'infant', typeName: 'Em bé', number: numberInfant, data: []}
      ]
    });
  };


  // fn sort by stop-label and price
  sortByStopAndPrice = (flights: any = []): Array<any> => {

    let stop1: Array<any> = [];
    let stop2: Array<any> = [];
    let stop3: Array<any> = [];

    for (let index in flights) {

      let flight = flights[index];

      if (flight.stops == 0) {
        stop1.push(flight);
      }
      if (flight.stops == 1) {
        stop2.push(flight);
      }
      if (flight.stops >= 2) {
        stop3.push(flight);
      }
    }

    stop1 = this.sortByTotalPrice(stop1);
    stop2 = this.sortByTotalPrice(stop2);
    stop3 = this.sortByTotalPrice(stop3);

    return stop1.concat(stop2).concat(stop3);
  };

  // fn sort by total price
  sortByTotalPrice = (flights: any = []): Array<any> => {//soft theo giá
    let compare = (a, b) => {
      if (a.totalPrice < b.totalPrice) {
        return -1; // less than to up
      }
      if (a.totalPrice > b.totalPrice) {
        return 1; // more than to down
      }
      return 0; // equal
    };

    return flights.sort(compare);
  };

  // fn sort by index
  sortBy = (flights: Array<Flight> = [], sort: any) => {

    switch (sort) {
      case FLIGHT_FILTER.sort.price: {
        // handle by price
        return flights.sort((a, b) => {
          if (a.totalPrice < b.totalPrice) {
            return -1; // less than to up
          }
          if (a.totalPrice > b.totalPrice) {
            return 1; // more than to down
          }
          return 0; // equal
        });
      }

      case FLIGHT_FILTER.sort.depart: {
        // handle by depart
        return flights.sort((a, b) => {
          let tempDateA = moment(a.departTime);
          let tempDateB = moment(b.departTime);
          // compare hours first
          if (tempDateA.hour() < tempDateB.hour()) {
            return -1;
          }
          if (tempDateA.hour() > tempDateB.hour()) {
            return 1;
          }
          // else a.hour === b.hour, so compare minutes to break the tie
          if (tempDateA.minute() < tempDateB.minute()) {
            return -1;
          }
          if (tempDateA.minute() > tempDateB.minute()) {
            return 1;
          }
          return 0; // couldn't break the tie
        });
      }

      case FLIGHT_FILTER.sort.landing: {
        // handle by landing
        return flights.sort((a, b) => {
          let tempDateA = moment(a.landingTime);
          let tempDateB = moment(b.landingTime);
          // compare hours first
          if (tempDateA.hour() < tempDateB.hour()) {
            return -1;
          }
          if (tempDateA.hour() > tempDateB.hour()) {
            return 1;
          }
          // else a.hour === b.hour, so compare minutes to break the tie
          if (tempDateA.minute() < tempDateB.minute()) {
            return -1;
          }
          if (tempDateA.minute() > tempDateB.minute()) {
            return 1;
          }
          return 0; // couldn't break the tie
        });
      }

      case FLIGHT_FILTER.sort.duration: {
        // handle by duration
        return flights.sort((a, b) => {
          if (a.flightDuration < b.flightDuration) {
            return -1; // less than to up
          }
          if (a.flightDuration > b.flightDuration) {
            return 1; // more than to down
          }
          return 0; // equal
        });
      }

      default: { //sort by price
        return flights.sort((a, b) => {
          if (a.totalPrice < b.totalPrice) {
            return -1; // less than to up
          }
          if (a.totalPrice > b.totalPrice) {
            return 1; // more than to down
          }
          return 0; // equal
        });
      }

    }
  };

  // fn filter-popup-popup with stop-label point
  filterByStopPoint(flights: Array<any> = [], points: any = [FLIGHT_FILTER.stop.all]) {

    let point: any = {};
    for (let key in FLIGHT_FILTER.stop) {
      point[key] = points.indexOf(FLIGHT_FILTER.stop[key]) !== -1;
    }

    // need review
    let results: Array<any> = [];

    flights.map((flight: Flight) => {
      if (!points.length
        || point.all
        || ((point.stop0 && flight.stops === 0)
          || (point.stop1 && flight.stops === 1)
          || (point.more && flight.stops >= 2))) {
        results.push(flight);
      }
    });

    return results;
  }

  // fn filter-popup-popup by depart range time
  filterByDepartRanger(data: Array<any> = [], filter: any = [0, 24]) {

    let range = {
      start: filter[0] || 0,
      end: filter[1] || 24,
    };

    let result: Array<any> = [];

    for (let index in data) {

      let flight = data[index];
      let hour = moment(flight.departTime).hour() + (moment(flight.departTime).minute() / 60);

      if (hour >= range.start && hour <= range.end) {
        result.push(flight);
      }
    }
    return result;
  }

  // fn filter-popup-popup by landing range time
  filterByLandingRanger(data: Array<any> = [], filter: any = [0, 24]) {

    let range = {
      start: filter[0] || 0,
      end: filter[1] || 24,
    };

    let result: Array<any> = [];

    for (let index in data) {

      let flight = data[index];
      let hour = moment(flight.landingTime).hour() + (moment(flight.landingTime).minute() / 60);

      if (hour >= range.start && hour <= range.end) {
        result.push(flight);
      }
    }
    return result;
  }

  // fn filer by carrier
  filterByCarrier(flights: Array<any> = [], carriers: Array<any> = ['all']) {

    let results: Array<any> = [];

    if (!carriers.length) {
      return flights;
    }

    for (let i = 0; i < carriers.length; i++) {
      for (let j = 0; j < flights.length; j++) {
        if (carriers[i] === 'all' || carriers[i] === flights[j].carrier) {
          results.push(flights[j]);
        }
      }
    }

    return results;
  }

  // fn on open filter-popup-popup popup
  onOpenFilter = () => {
    this.flightFilterPopup.show();
  };

  // fn on submit filter-popup-popup
  onSubmitFilter = ($event: any) => {

    this.filter = $event;
    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams(this.filter));
  };

  // fn on update filter-popup-popup counter
  onUpdateFilterCounter = ($event: any): any => {
    this.filterCounter = $event || 0;
  };

  // fn on filter-popup-popup with params
  onFilterWith = (): Array<any> => {

    this.isEmptyData = false;
    let flights = this._storage.getItem(CSTORAGE.FILTER_DATA);

    // TODO Filter theo điểm dừng
    flights = this.filterByStopPoint(flights, this.filter.points);

    // TODO Filter theo thời gian cất cánh
    flights = this.filterByDepartRanger(flights, this.filter.depart);

    // TODO Filter theo thời gian hạ cánh
    flights = this.filterByLandingRanger(flights, this.filter.landing);

    // Filter theo hãng
    flights = this.filterByCarrier(flights, this.filter.carriers);

    //sort by price and stop point
    if (this.utilityHelper.isNullOrUndefined(this.filter.sort)) {
      if (this.flightSearch.Cheap) {
        flights = this.sortByTotalPrice(flights);
      } else {
        flights = this.sortByStopAndPrice(flights);
      }
    } else {
      flights = this.sortBy(flights, this.filter.sort);
    }

    this.isEmptyData = flights.length == 0;

    this.flights = flights;

    return flights;
  };

  // fn on append params to router
  updateParamsToRoute = (params: any = {}) => {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.flightSearch, params))
    });
  };

}
