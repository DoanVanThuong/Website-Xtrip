import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../app.base';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaneTicketRepo} from '../../../../common/repos';
import {CSTORAGE} from '../../../../app.constants';
import {StorageService} from '../../../../common/services';
import {FlightSearch, HotelLocation as FlightLocation} from '../../../../common/entities';

const MAX: number = 9;
const MAX_INFANT: number = 4;

@Component({
  selector: 'home-cheap-flight-search-box',
  templateUrl: 'cheap-flight-search-box.component.html',
  styleUrls: ['cheap-flight-search-box.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCheapFlightSearchBoxComponent extends AppBase {

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  origin: string = '';
  destination: string = '';
  passenger: string = '';

  isOriginShow: boolean = false;
  isDestinationShow: boolean = false;
  isPassengerShow: boolean = false;

  favoriteLocations: Array<any> = [];
  selectedLocations: Array<any> = [];

  origins: Array<any> = [];
  destinations: Array<any> = [];

  flightSearch: FlightSearch = new FlightSearch({
    Adult: 1,
    RoundTrip: false,
  });

  isOriginTyping: boolean = false;
  isDestinationTyping: boolean = false;
  timeout: any = null;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _pTicketRepo: PlaneTicketRepo,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this.getSelectedLocations();
    this.getFavoriteLocations();
    this.onLoadHistory();

    this.passenger = this.utilityHelper.convertPassenger(Number(this.flightSearch.Adult), Number(this.flightSearch.Child), Number(this.flightSearch.Infant));
  }

  // fn on load selected history
  onLoadHistory = () => {

    let start = this._storage.getItem(CSTORAGE.FLIGHT_START);
    let end = this._storage.getItem(CSTORAGE.FLIGHT_END);

    // update data object
    this.origin = !this.utilityHelper.isNullOrUndefined(start) ? start.view : this.flightSearch.Origin;
    this.destination = !this.utilityHelper.isNullOrUndefined(end) ? end.view : this.flightSearch.Destination;

    // update data result
    this.flightSearch = new FlightSearch(Object.assign({}, this.flightSearch, {
      Origin: !this.utilityHelper.isNullOrUndefined(start) ? start.code : '',
      Destination: !this.utilityHelper.isNullOrUndefined(end) ? end.code : '',
      Cheap: true
    }));

    this.passenger = this.utilityHelper.convertPassenger(Number(this.flightSearch.Adult), Number(this.flightSearch.Child), Number(this.flightSearch.Infant));
  };

  // fn on switch location
  onSwitchLocation = (): void => {

    let temp = this.origin;
    this.origin = this.destination;
    this.destination = temp;

    let temp2 = this.flightSearch.Origin;
    this.flightSearch.Origin = this.flightSearch.Destination;
    this.flightSearch.Destination = temp2;

    // update storage
    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: this.origin,
      code: this.flightSearch.Origin
    });
    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: this.destination || '',
      code: this.flightSearch.Destination || ''
    });
  };

  // get history origin
  getSelectedLocations = () => {
    let locations = this._storage.getItem(CSTORAGE.FLIGHT_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(locations) && locations.length > 0) {
      this.selectedLocations = locations.map(location => new FlightLocation(location));
    }
  };

  // get favorite location
  getFavoriteLocations = () => {
    return this._pTicketRepo
      .getFavoriteLocation()
      .then(
        (res: any) => {
          this.favoriteLocations = res.data.map(location => new FlightLocation(location));
        }
      );
  };

  // fn outside click event
  onClickedOutside = (e: Event, mode: string = '') => {

    switch (mode) {
      case 'origin': {
        this.isOriginShow = false;
        break;
      }
      case 'destination': {
        this.isDestinationShow = false;
        break;
      }
      case 'passenger': {
        this.isPassengerShow = false;
        break;
      }
    }
  };

  // fn on open dropdown search
  openDropdownSearch = (mode: string = '') => {

    switch (mode.toLowerCase()) {
      case 'origin': {
        this.isOriginShow = true;
        break;
      }
      case 'destination' : {
        this.isDestinationShow = true;
        break;
      }
      case 'passenger' : {
        this.isPassengerShow = true;
        break;
      }
    }
  };

  // on Origin changed
  onOriginChange(e: any) {

    clearTimeout(this.timeout);

    this.isOriginTyping = true;

    // pending in 0.5s to request api
    this.timeout = setTimeout(() => {
      if (e.length > 1) {

        return this._pTicketRepo
          .getAirportList(e)
          .then(
            (res: any) => {
              this.isOriginTyping = false;
              this.origins = res;
            },
            (errors: any) => {
              this.origins = [];
              this.isOriginTyping = false;
            }
          );
      } else if (e.length == 0) {
        this.origins = [];
        this.isOriginTyping = false;
      }
    }, 500);
  }

  // fn destination change
  onDestinationChange = (e: any) => {

    clearTimeout(this.timeout);

    this.isDestinationTyping = true;

    this.timeout = setTimeout(() => {
      if (e.length > 1) {

        return this._pTicketRepo
          .getAirportList(e)
          .then(
            (res: any) => {
              this.isDestinationTyping = false;
              this.destinations = res;
            },
            (errors: any) => {
              this.destinations = [];
              this.isDestinationTyping = false;
            }
          );
      } else if (e.length == 0) {
        this.destinations = [];
        this.isDestinationTyping = false;
      }
    }, 500);
  };

  // on select origin location
  onSelectLocation = (location: FlightLocation, mode: string = '') => {

    switch (mode.toLowerCase()) {
      case 'origin': {
        this.origin = `${location.name} (${location.code})`;
        this.flightSearch.Origin = location.code;

        this._storage.setItem(CSTORAGE.FLIGHT_START, {
          view: this.origin,
          code: this.flightSearch.Origin
        });

        this.isOriginShow = false;

        break;
      }
      case'destination': {
        this.destination = `${location.name} (${location.code})`;
        this.flightSearch.Destination = location.code;

        this._storage.setItem(CSTORAGE.FLIGHT_END, {
          view: this.destination,
          code: this.flightSearch.Destination
        });

        this.isDestinationShow = false;

        break;
      }
    }

    if (!this.onDetectExistingInHistory(location)) {
      this.selectedLocations.push({
        location: location.location,
        name: location.name,
        code: location.code
      });

      this._storage.setItem(CSTORAGE.FLIGHT_LOCATION, this.selectedLocations);
    }
  };

  // fn detect item is existing in a list
  onDetectExistingInHistory = (location: FlightLocation): boolean => {
    let item = _.find(this.selectedLocations, (item) => {
      return item.code === location.code;
    });

    return !!item;
  };

  // fn passenger change
  onPassengerChange(quantity: any, mode: string = '') {

    switch (mode) {
      case'adult': {
        if (this.flightSearch.Adult !== quantity) {
          this.flightSearch.Infant = 0;
        }
        this.flightSearch.Adult = quantity;
        break;
      }
      case'child': {
        this.flightSearch.Child = quantity;
        break;
      }
      case 'infant': {
        if (quantity > 4) {
          this.flightSearch.Infant = 4;
        } else {
          this.flightSearch.Infant = quantity;
        }
        break;
      }
    }

    this.passenger = this.utilityHelper.convertPassenger(Number(this.flightSearch.Adult), Number(this.flightSearch.Child), Number(this.flightSearch.Infant));
  }

  // fn detect max passegener
  onDetectMaxPassenger = (mode: string = '') => {

    switch (mode) {
      case 'adult': {
        return MAX - this.flightSearch.Child;
      }
      case 'child': {
        return MAX - this.flightSearch.Adult;
      }
      case 'infant': {
        if (this.flightSearch.Adult < MAX_INFANT) {
          return this.flightSearch.Adult;
        }
        return MAX_INFANT;
      }
    }

    return MAX;
  };

  // fn disable submit
  onDisableSubmit = (): boolean => {
    return !this.origin || !this.destination || this.origin === this.destination;
  };

  // fn open cheap flight popup
  onSubmit = (): void => {
    this.submit.emit(this.flightSearch);
  };

}
