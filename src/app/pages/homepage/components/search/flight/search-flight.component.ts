// import {AppPage} from '../../../../../app.base';
// import {Component, ViewEncapsulation} from '@angular/core';
// import {Router} from '@angular/router';
// import {StorageService} from '../../../../../common/services';
// import {PlaneTicketRepo} from '../../../../../common/repos';
// import {CSTORAGE, DATE_FORMAT} from '../../../../../app.constants';
// import {Error, FlightSearch, HotelLocation as FlightLocation} from '../../../../../common/entities';
// import * as moment from 'moment';
// import {ToastrService} from 'ngx-toastr';
// import {Location} from '@angular/common';
// import {BsDatepickerConfig, BsLocaleService, defineLocale} from 'ngx-bootstrap';
// import {viLocale} from '../../../../../../assets/localize/vi';

// const MAX: number = 9;
// const MAX_INFANT: number = 4;
// defineLocale('vi', viLocale);

// @Component({
//   selector: 'home-search-flight',
//   templateUrl: './search-flight.component.html',
//   styleUrls: ['search-flight.component.less'],
//   encapsulation: ViewEncapsulation.None
// })
// export class SearchFlightComponent extends AppPage {

//   isTwoWay: boolean = false;

//   isOriginShow: boolean = false;
//   isDestinationShow: boolean = false;
//   isPassengerShow: boolean = false;

//   origin: string = '';
//   destination: string = '';
//   date: string = moment().format(DATE_FORMAT.DATE);
//   passenger: string = '1 người lớn';

//   timeout: any = null;

//   isOriginFinding: boolean = false; // mini hack
//   isOriginTyping: boolean = false;
//   isDestinationFinding: boolean = false; // mini hack
//   isDestinationTyping: boolean = false;

//   favoriteLocations: Array<any> = [];
//   selectedLocations: Array<any> = [];
//   origins: Array<any> = [];
//   destinations: Array<any> = [];

//   flightSearch: FlightSearch = new FlightSearch({
//     Adult: 1,
//     DepartDate: moment().format(DATE_FORMAT.VALUE)
//   });

//   datePickerOptions: Partial<BsDatepickerConfig> = {
//     minDate: new Date(),
//     containerClass: 'theme-orange theme-custom m-t-15',
//     dateInputFormat: !this.isTwoWay ? 'DD/MM/YYYY' : 'DD/MM',
//     showWeekNumbers: false
//   };
//   locale: string = 'vi';

//   constructor(private _router: Router,
//               private _location: Location,
//               private _toaster: ToastrService,
//               private _storage: StorageService,
//               private _localeService: BsLocaleService,
//               private _pTicketRepo: PlaneTicketRepo) {
//     super();
//     this._localeService.use(this.locale);
//   }

//   ngOnInit() {
//     this.getSelectedLocations();
//     this.getFavoriteLocations();

//     this.onLoadHistory();
//   }

//   // fn on load selected history
//   onLoadHistory = () => {

//     let start = this._storage.getItem(CSTORAGE.FLIGHT_START);
//     let end = this._storage.getItem(CSTORAGE.FLIGHT_END);

//     // update data object
//     this.origin = !this.utilityHelper.isNullOrUndefined(start) ? start.view : '';
//     this.destination = !this.utilityHelper.isNullOrUndefined(end) ? end.view : '';

//     this.onSelectDateAuto();

//     // update data result
//     this.flightSearch = new FlightSearch(Object.assign({}, this.flightSearch, {
//       Origin: !this.utilityHelper.isNullOrUndefined(start) ? start.code : '',
//       Destination: !this.utilityHelper.isNullOrUndefined(end) ? end.code : '',
//       RoundTrip: this.isTwoWay
//     }));
//   };

//   // fn select default date to flight
//   onSelectDateAuto = (): void => {
//     let start = this._storage.getItem(CSTORAGE.FLIGHT_START_DATE, false);
//     let end = this._storage.getItem(CSTORAGE.FLIGHT_END_DATE, false);
//     if (!!start) {
//       start = moment(start);

//       let now = moment();
//       let day = 60 * 60 * 24;

//       // need review
//       let startDiff = start.diff(now);

//       if (Math.round(startDiff / day) < 1) {
//         start = moment();
//       }

//       this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, start.format('YYYY-MM-DD'));
//     } else {
//       return;
//     }

//     if (!this.isTwoWay) {
//       this.flightSearch.DepartDate = moment(start).format('YYYY-MM-DD');

//       this.date = `${moment(start).format('DD/MM/YYYY')}`;
//     } else {
//       if (moment(end).diff(start) > 0) {//case: end date > start date
//         this.flightSearch.DepartDate = moment(start).format('YYYY-MM-DD');
//         this.flightSearch.ReturnDate = moment(end).format('YYYY-MM-DD');

//         this.date = `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM')}`;
//       } else {
//         this.flightSearch.DepartDate = null;
//         this.flightSearch.ReturnDate = null;

//         this.date = '';
//       }
//     }
//   };

//   // on Origin changed
//   onOriginChange(e: any) {

//     clearTimeout(this.timeout);

//     this.isOriginTyping = true;

//     // pending in 0.5s to request api
//     this.timeout = setTimeout(() => {
//       if (e.length > 1) {

//         return this._pTicketRepo
//           .getAirportList(e)
//           .then(
//             (res: any) => {
//               this.isOriginTyping = false;
//               this.isOriginFinding = true;
//               this.origins = res;
//             },
//             (errors: Error[] = []) => {
//               this.origins = [];
//               this.isOriginTyping = false;
//               this.isOriginFinding = true;
//             }
//           );
//       } else if (e.length == 0) {
//         this.origins = [];
//         this.isOriginTyping = false;
//         this.isOriginFinding = false;
//       }
//     }, 500);
//   }

//   // fn destination change
//   onDestinationChange = (e: any) => {

//     clearTimeout(this.timeout);

//     this.isDestinationTyping = true;

//     this.timeout = setTimeout(() => {
//       if (e.length > 1) {

//         return this._pTicketRepo
//           .getAirportList(e)
//           .then(
//             (res: any) => {
//               this.isDestinationTyping = false;
//               this.isDestinationFinding = true;
//               this.destinations = res;
//             },
//             (errors: Error[] = []) => {
//               this.destinations = [];
//               this.isDestinationTyping = false;
//               this.isDestinationFinding = true;
//             }
//           );
//       } else if (e.length == 0) {
//         this.destinations = [];
//         this.isDestinationTyping = false;
//         this.isDestinationFinding = false;
//       }
//     }, 500);
//   };

//   // get history origin
//   getSelectedLocations = () => {
//     let locations = this._storage.getItem(CSTORAGE.FLIGHT_LOCATION);
//     if (!this.utilityHelper.isNullOrUndefined(locations) && locations.length > 0) {
//       this.selectedLocations = locations.map(item => new FlightLocation(item));
//     }
//   };

//   // get favorite location
//   getFavoriteLocations = () => {
//     return this._pTicketRepo
//       .getFavoriteLocation()
//       .then(
//         (res: any) => {
//           this.favoriteLocations = res.data;
//         },
//         (errors: any) => {

//         }
//       );
//   };

//   // on select origin location
//   onSelectLocation = (location: FlightLocation, mode: string = '') => {

//     switch (mode.toLowerCase()) {
//       case 'origin': {
//         this.origin = `${location.name} (${location.code})`;
//         this.flightSearch.Origin = location.code;

//         this._storage.setItem(CSTORAGE.FLIGHT_START, {
//           view: this.origin,
//           code: this.flightSearch.Origin
//         });

//         this.isOriginShow = false;

//         break;
//       }
//       case 'destination': {
//         this.destination = `${location.name} (${location.code})`;
//         this.flightSearch.Destination = location.code;

//         this._storage.setItem(CSTORAGE.FLIGHT_END, {
//           view: this.destination,
//           code: this.flightSearch.Destination
//         });

//         this.isDestinationShow = false;

//         break;
//       }
//     }

//     if (!this.onDetectExistingInHistory(location)) {
//       this.selectedLocations.unshift({
//         location: location.location,
//         name: location.name,
//         code: location.code
//       });

//       this._storage.setItem(CSTORAGE.FLIGHT_LOCATION, this.selectedLocations.slice(0, 10));
//     }
//   };

//   // fn detect item is existing in a list
//   onDetectExistingInHistory = (location: FlightLocation) => {

//     const item = _.find(this.selectedLocations, (item) => {
//       return item.code === location.code;
//     });

//     return !!item;
//   };

//   // fn on open dropdown search
//   openDropdownSearch = (mode: string = '') => {

//     switch (mode.toLowerCase()) {
//       case 'origin': {
//         this.isOriginShow = true;
//         break;
//       }
//       case 'destination': {
//         this.isDestinationShow = true;
//         break;
//       }
//       case 'passenger': {
//         this.isPassengerShow = true;
//         break;
//       }
//     }
//   };

//   // on swap locations
//   onSwitchLocation() {

//     let temp = this.origin;
//     this.origin = this.destination;
//     this.destination = temp;

//     let temp2 = this.flightSearch.Origin;
//     this.flightSearch.Origin = this.flightSearch.Destination;
//     this.flightSearch.Destination = temp2;

//     this._storage.setItem(CSTORAGE.FLIGHT_START, {
//       view: this.origin,
//       code: this.flightSearch.Origin
//     });
//     this._storage.setItem(CSTORAGE.FLIGHT_END, {
//       view: this.destination,
//       code: this.flightSearch.Destination
//     });
//   }

//   // fn on select date
//   onSelectedDate = (target: any): void => {

//     if (target instanceof Array) {

//       const start = moment(target[0]);
//       const end = moment(target[1]);


//       this.flightSearch.DepartDate = start.format(DATE_FORMAT.VALUE);
//       this.flightSearch.ReturnDate = end.format(DATE_FORMAT.VALUE);

//       this.date = `${start.format('DD/MM')} - ${end.format('DD/MM')}`;

//     } else {
//       this.flightSearch.DepartDate = moment(target).format(DATE_FORMAT.VALUE);

//       this.date = moment(target).format('DD/MM/YYYY');
//     }

//     this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.flightSearch.DepartDate);
//     this._storage.setItem(CSTORAGE.FLIGHT_END_DATE, this.flightSearch.ReturnDate);
//   };

//   // fn on submit search
//   onSearch = () => {

//     this._router.navigate(['/flight/result'], {
//       queryParams: this.utilityHelper.buildQueryParams(this.flightSearch)
//     });
//   };

//   // fn disable submit
//   onDisableSubmit = (): boolean => {
//     return !this.origin || !this.destination || !this.date || !this.passenger;
//   };

//   // fn passenger change
//   onPassengerChange(quantity: any, mode: string = '') {

//     switch (mode) {
//       case 'adult': {
//         if (this.flightSearch.Adult !== quantity) {
//           this.flightSearch.Infant = 0;
//         }
//         this.flightSearch.Adult = quantity;
//         break;
//       }
//       case 'child': {
//         this.flightSearch.Child = quantity;
//         break;
//       }
//       case 'infant': {
//         if (quantity > 4) {
//           this.flightSearch.Infant = 4;
//         } else {
//           this.flightSearch.Infant = quantity;
//         }
//         break;
//       }
//     }

//     this.passenger = `${this.flightSearch.Adult} người lớn` + (this.flightSearch.Child ? `, ${this.flightSearch.Child} trẻ em` : '') + (this.flightSearch.Infant ? `, ${this.flightSearch.Infant} em bé` : '');
//   }

//   // fn detect max passegener
//   onDetectMaxPassenger = (mode: string = '') => {

//     switch (mode) {
//       case 'adult': {
//         return MAX - this.flightSearch.Child;
//       }
//       case 'child': {
//         return MAX - this.flightSearch.Adult;
//       }
//       case 'infant': {
//         if (this.flightSearch.Adult < MAX_INFANT) {
//           return this.flightSearch.Adult;
//         }
//         return MAX_INFANT;
//       }
//     }

//     return MAX;
//   };

//   // fn on clicked outside
//   onClickedOutside = (e: Event, mode: string = '') => {

//     switch (mode) {
//       case 'origin': {
//         this.isOriginShow = false;
//         break;
//       }
//       case 'destination': {
//         this.isDestinationShow = false;
//         break;
//       }
//       case 'passenger': {
//         this.isPassengerShow = false;
//         break;
//       }
//     }
//   };

//   // fn mode change to render
//   onModeChange = ($event: boolean = false): void => {

//     this.isTwoWay = $event;

//     if (!this.isTwoWay) {
//       this.flightSearch.ReturnDate = null;
//     }

//     this.flightSearch.RoundTrip = this.isTwoWay;
//   };
// }
