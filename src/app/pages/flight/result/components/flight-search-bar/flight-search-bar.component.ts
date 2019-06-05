import {AppPage} from '../../../../../app.base';
import {Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../common/services';
import {PlaneTicketRepo} from '../../../../../common/repos';
import {CSTORAGE, DATE_FORMAT} from '../../../../../app.constants';
import {FlightSearch} from '../../../../../common/entities';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {isPlatformBrowser, Location} from '@angular/common';
import {BsDatepickerConfig, BsLocaleService, defineLocale} from 'ngx-bootstrap';
import {viLocale} from '../../../../../../assets/localize/vi';

defineLocale('vi', viLocale);

const MAX: number = 9;
const MAX_INFANT: number = 4;

@Component({
  selector: 'app-flight-search-bar',
  templateUrl: './flight-search-bar.component.html',
  styleUrls: ['./flight-search-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightSearchBarComponent extends AppPage {

  isRoundTrip: boolean = false;

  isOriginShow: boolean = false;
  isDestinationShow: boolean = false;
  isPassengerShow: boolean = false;

  params: any = {};
  origin: string = '';
  destination: string = '';
  date: string = moment().format(DATE_FORMAT.DATE);
  passenger: string = '1 người lớn';

  timeout: any = null;

  isOriginTyping: boolean = false;
  isDestinationTyping: boolean = false;

  dates: any = null;
  favoriteLocations: Array<any> = [];
  selectedLocations: Array<any> = [];
  origins: Array<any> = [];
  destinations: Array<any> = [];

  flightSearch: FlightSearch = new FlightSearch({
    Adult: 1,
    DepartDate: moment().add(1, 'day').format(DATE_FORMAT.VALUE),
    ReturnDate: moment().add(2, 'day').format(DATE_FORMAT.VALUE)
  });

  datePickerOptions: Partial<BsDatepickerConfig> = {
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom m-t-5',
    dateInputFormat: !this.isRoundTrip ? 'DD/MM/YYYY' : 'DD/MM',
    showWeekNumbers: false
  };
  locale: string = 'vi';

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _location: Location,
              private _toastr: ToastrService,
              private _storage: StorageService,
              private _localeService: BsLocaleService,
              private _pTicketRepo: PlaneTicketRepo,
              private _ele: ElementRef,
              @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this._localeService.use(this.locale);
  }

  ngOnInit() {
    this.getSelectedLocations();
    this.getFavoriteLocations();

    this._activatedRoute.queryParams.subscribe((params) => {

      this.params = params;
      this.flightSearch = new FlightSearch(params);

      this.isRoundTrip = params.RoundTrip == 'true';
      this.onModeChange(this.isRoundTrip);
      this.onLoadHistory();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = ($event: any) => {

    if (isPlatformBrowser(this.platformID)) {

      const bar = $('.flight-search-bar');
      const header = $('.header');
      const body = $('.main-body');

      if ($(window).scrollTop() > header.innerHeight()) {

        bar.addClass('fixed-top');
        body.css({
          marginTop: bar.innerHeight()
        });

      } else {
        bar.removeClass('fixed-top');
        body.removeAttr('style');
      }
    }
  };

  // fn on load selected history
  onLoadHistory = () => {

    let start = this._storage.getItem(CSTORAGE.FLIGHT_START);
    let end = this._storage.getItem(CSTORAGE.FLIGHT_END);

    // update data object
    this.origin = !this.utilityHelper.isNullOrUndefined(start) ? start.view : this.flightSearch.Origin;
    this.destination = !this.utilityHelper.isNullOrUndefined(end) ? end.view : this.flightSearch.Destination;

    this.onSelectDateAuto();

    // update data result
    this.flightSearch = new FlightSearch(Object.assign({}, this.flightSearch, this.params, {
      Origin: !this.utilityHelper.isNullOrUndefined(start) ? start.code : '',
      Destination: !this.utilityHelper.isNullOrUndefined(end) ? end.code : '',
      RoundTrip: this.isRoundTrip
    }));

    this.passenger = this.utilityHelper.convertPassenger(Number(this.flightSearch.Adult), Number(this.flightSearch.Child), Number(this.flightSearch.Infant));
  };


  // fn select default date to flight
  onSelectDateAuto() {
    let start = this.flightSearch.DepartDate || this._storage.getItem(CSTORAGE.FLIGHT_START_DATE, false);
    let end = this.flightSearch.ReturnDate || this._storage.getItem(CSTORAGE.FLIGHT_END_DATE, false);

    if (!!start) {
      start = moment(start);

      let now = moment();
      let day = 60 * 60 * 24;

      // need review
      let startDiff = start.diff(now);

      if (Math.round(startDiff / day) < 1) {
        start = moment();
      }
      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, start.format('YYYY-MM-DD'));
    } else {
      return;
    }

    if (!this.isRoundTrip) {
      this.flightSearch.DepartDate = moment(start).format('YYYY-MM-DD');

      this.date = `${moment(start).format('DD/MM/YYYY')}`;
    } else {
      if (moment(end).diff(start) > 0) {//case: end date > start date
        this.flightSearch.DepartDate = moment(start).format('YYYY-MM-DD');
        this.flightSearch.ReturnDate = moment(end).format('YYYY-MM-DD');

        this.date = `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM')}`;
      } else {
        this.flightSearch.DepartDate = null;
        this.flightSearch.ReturnDate = null;

        this.date = '';
      }
    }
  }

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

  // get history origin
  getSelectedLocations = () => {
    let locations = this._storage.getItem(CSTORAGE.FLIGHT_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(locations) && locations.length > 0) {
      this.selectedLocations = locations;
    }
  };

  // get favorite location
  getFavoriteLocations = () => {
    return this._pTicketRepo
      .getFavoriteLocation()
      .then(
        (res: any) => {
          this.favoriteLocations = res.data;
        },
        (errors: any) => {

        }
      );
  };

  // on select origin location
  onSelectLocation = (location: any, mode: string = '') => {

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

    if (!this.onDetectExistingInHistory(location.code)) {
      this.selectedLocations.push({
        location: location.location,
        name: location.name,
        code: location.code
      });

      this._storage.setItem(CSTORAGE.FLIGHT_LOCATION, this.selectedLocations);
    }
  };

  // fn detect item is existing in a list
  onDetectExistingInHistory = (code: string) => {
    for (let key in this.selectedLocations) {
      let item = this.selectedLocations[key];
      if (item.code === code) {
        return true;
      }
    }

    return false;
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

  // on swap locations
  onSwap() {

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
  }

  // fn on select date
  onSelectedDate = (target: any): void => {

    if (target instanceof Array) {
      this.flightSearch.DepartDate = moment(target[0]).format(DATE_FORMAT.VALUE);
      this.flightSearch.ReturnDate = moment(target[1]).format(DATE_FORMAT.VALUE);

      this.date = `${moment(target[0]).format('DD/MM')} - ${moment(target[1]).format('DD/MM')}`;
    } else {
      this.flightSearch.DepartDate = moment(target).format(DATE_FORMAT.VALUE);

      this.date = moment(target).format(DATE_FORMAT.DATE);
    }

    this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.flightSearch.DepartDate);
    this._storage.setItem(CSTORAGE.FLIGHT_END_DATE, this.flightSearch.ReturnDate);
  };

  // fn on submit search
  onSearch = () => {


    this._router.navigate(['/flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.flightSearch, {
        SelectDepartValue: null,
        DirectionCode: 1
      }))
    });
  };

  // fn disable submit
  onDisableSubmit = (): boolean => {
    return !this.origin || !this.destination || !this.date || !this.passenger;
  };

  // fn passenger change
  onPassengerChange(quantity: any, mode: string = '') {

    switch (mode) {
      case'adult': {

        if (quantity > (MAX - this.flightSearch.Child)) {
          this._toastr.error('Tổng số hành khách người lớn và trẻ em không được lớn hơn 9.', null, {
            positionClass: 'toast-top-right'
          });
          // this.flightSearch.Adult = MAX - this.flightSearch.Child;
          return;
        }

        if (this.flightSearch.Adult !== quantity && (this.flightSearch.Infant > quantity)) {
          this.flightSearch.Infant--;
        }

        this.flightSearch.Adult = quantity;
        break;
      }
      case'child': {

        if (quantity > (MAX - this.flightSearch.Adult)) {
          this._toastr.error('Tổng số hành khách người lớn và trẻ em không được lớn hơn 9.', null, {
            positionClass: 'toast-top-right'
          });
          this.flightSearch.Child = MAX - this.flightSearch.Adult;
          return;
        }

        this.flightSearch.Child = quantity;
        break;
      }
      case 'infant': {
        if (quantity > MAX_INFANT) {
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

  // fn on clicked outside
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

  // fn mode change to render
  onModeChange = ($event: any) => {

    this.isRoundTrip = $event;

    if (!this.isRoundTrip) {
      this.flightSearch.ReturnDate = null;
    }

    this.onSelectDateAuto();

    this.flightSearch.RoundTrip = this.isRoundTrip;
  };
}
