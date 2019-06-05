// import {AppPage} from '../../../../../app.base';
// import {Component, ViewEncapsulation} from '@angular/core';
// import {Router} from '@angular/router';
// import {StorageService} from '../../../../../common/services';
// import {HotelRepo} from '../../../../../common/repos';
// import {CSTORAGE, DATE_FORMAT} from '../../../../../app.constants';
// import {HotelSearch, HotelLocation} from '../../../../../common/entities';
// import * as moment from 'moment';
// import {ToastrService} from 'ngx-toastr';
// import {Location} from '@angular/common';
// import {BsDatepickerConfig, BsLocaleService, defineLocale} from 'ngx-bootstrap';
// import {viLocale} from '../../../../../../assets/localize/vi';

// defineLocale('vi', viLocale);

// @Component({
//   selector: 'home-search-hotel',
//   templateUrl: './search-hotel.component.html',
//   styleUrls: ['search-hotel.component.less'],
//   encapsulation: ViewEncapsulation.None
// })
// export class SearchHotelComponent extends AppPage {

//   isDestinationShow: boolean = false;
//   isPassengerShow: boolean = false;

//   night: number = 0;
//   destination: string = '';
//   checkIn: Date[] = [];
//   checkInOutTime: string = '';
//   passenger: string = '1 người, 1 phòng';

//   timeout: any = null;

//   isDestinationFinding: boolean = false;
//   isDestinationTyping: boolean = false;

//   favoriteLocations: Array<any> = [];
//   selectedLocations: Array<any> = [];
//   destinations: Array<any> = [];
//   selectedDestination: any = {};

//   hotelSearch: HotelSearch = new HotelSearch({
//     rooms: 1,
//     adults: 1,
//     checkIn: moment().add(1, 'day').format(DATE_FORMAT.VALUE),
//     checkOut: moment().add(2, 'day').format(DATE_FORMAT.VALUE)
//   });

//   locale: string = 'vi';
//   datePickerOptions: Partial<BsDatepickerConfig> = {
//     minDate: new Date(),
//     containerClass: 'theme-orange theme-custom m-t-15',
//     showWeekNumbers: false
//   };

//   constructor(private _router: Router,
//               private _location: Location,
//               private _toaster: ToastrService,
//               private _storage: StorageService,
//               private _localeService: BsLocaleService,
//               private _hotelRepo: HotelRepo) {
//     super();
//     this._localeService.use(this.locale);
//   }

//   ngOnInit() {
//     this.getSelectedLocations();
//     this.getFavoriteLocations();

//     this.onLoadHistory();

//     // handle check-in time
//     const checkIn = moment(this.hotelSearch.checkIn);
//     const checkOut = moment(this.hotelSearch.checkOut);
//     this.night = checkOut.diff(checkIn, 'day');

//     this.checkIn = [
//       new Date(checkIn.year(), checkIn.month(), checkIn.date()),
//       new Date(checkOut.year(), checkOut.month(), checkOut.date()),
//     ];

//     this.checkInOutTime = `${checkIn.format('DD/MM/YYYY')} - ${checkOut.format('DD/MM/YYYY')} (${this.night} đêm)`;
//   }

//   // fn on fill data - history
//   onLoadHistory = () => {

//     const location = this._storage.getItem(CSTORAGE.HOTEL_DESTINATION);

//     if (!!location) {
//       this.destination = `${location.name}, ${location.countryName}`;
//       this.selectedDestination = location;
//     }
//   };

//   // fn destination change
//   onDestinationChange = ($event: any) => {

//     clearTimeout(this.timeout);

//     this.isDestinationTyping = true;

//     this.timeout = setTimeout(() => {
//       if ($event.length > 1) {

//         return this._hotelRepo
//           .getDestinationHotel($event)
//           .then(
//             (res: any) => {
//               this.isDestinationTyping = false;
//               this.isDestinationFinding = true;
//               this.destinations = res.data.map(destination => destination);
//             },
//             (errors: any) => {
//               this.destinations = [];
//               this.isDestinationFinding = true;
//               this.isDestinationTyping = false;
//             }
//           );
//       } else if (!$event.length) {
//         this.destinations = [];
//         this.isDestinationTyping = false;
//         this.isDestinationFinding = false;
//       }
//     }, 500);
//   };

//   // get history origin
//   getSelectedLocations = () => {
//     let locations = this._storage.getItem(CSTORAGE.HOTEL_LOCATION);
//     if (!this.utilityHelper.isNullOrUndefined(locations) && locations.length > 0) {
//       this.selectedLocations = locations.map(location => new HotelLocation(location));
//     }
//   };

//   // fn get favourite hotels
//   getFavoriteLocations = () => {
//     return this._hotelRepo
//       .getFavourites()
//       .then(
//         (res: any) => {
//           this.favoriteLocations = res.data.map(location => new HotelLocation(location));
//         }
//       );
//   };

//   // on select origin location
//   onSelectLocation = (location: HotelLocation, mode: string = '') => {

//     this.destination = `${location.name}, ${location.countryName}`;
//     this.selectedDestination = location;
//     this.isDestinationShow = false;

//     this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, this.selectedDestination);

//     if (!this.onDetectExistingInHistory(location)) {
//       this.selectedLocations.unshift(location);
//       this._storage.setItem(CSTORAGE.HOTEL_LOCATION, this.selectedLocations.slice(0, 10));
//     }
//   };

//   // fn detect item is existing in a list
//   onDetectExistingInHistory = (location: any): boolean => {

//     let item = _.find(this.selectedLocations, (item) => {
//       return item.code === location.code;
//     });

//     return !!item;
//   };

//   // fn on open dropdown search
//   openDropdownSearch = (mode: string = '') => {

//     switch (mode.toLowerCase()) {
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

//   // fn on select date
//   onSelectedDate = ($event: any): void => {

//     if (!$event.length || $event.length < 2) {
//       return;
//     }

//     const checkIn = moment($event[0]);
//     const checkOut = moment($event[1]);

//     this.night = checkOut.diff(checkIn, 'day');

//     if (this.night <= 0) {
//       this.checkInOutTime = '';
//       return;
//     }

//     this.checkInOutTime = `${checkIn.format('DD/MM/YYYY')} - ${checkOut.format('DD/MM/YYYY')} (${this.night} đêm)`;

//     this.hotelSearch.checkIn = checkIn.format('YYYY-MM-DD');
//     this.hotelSearch.checkOut = checkOut.format('YYYY-MM-DD');
//   };

//   // fn disable submit
//   onDisableSubmit = (): boolean => {
//     return !this.destination || !this.checkIn || !this.night || !this.passenger;
//   };

//   // fn on submit search
//   onSearch = () => {

//     this._storage.setItem(CSTORAGE.HOTEL_SEARCH, this.hotelSearch);

//     this._router.navigate(['/hotel/result'], {
//       queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
//         latitude: this.selectedDestination.latitude,
//         longitude: this.selectedDestination.longitude,
//         name: this.selectedDestination.name,
//         destinationType: this.selectedDestination.destinationType,
//         // nights: Number(this.night) || 1,
//         sortIndex: 0
//       }))
//     });
//   };

//   // fn detect max passegener
//   onDetectMaxPassenger = (mode: string = '') => {

//     switch (mode) {
//       case 'room': {
//         if (this.hotelSearch.adults < 8) {
//           return this.hotelSearch.adults;
//         }
//         return 8;
//       }
//       case 'people': {
//         return 16;
//       }
//     }

//     return 8;
//   };

//   // fn passenger change
//   onPassengerChange = (quantity: any, mode: string = '') => {

//     switch (mode) {
//       case 'room': {
//         if (quantity > this.hotelSearch.adults) {
//           this._toaster.error('Số phòng không thể lớn hơn số hành khách', 'Chọn phòng', {
//             positionClass: 'toastr-top-right'
//           });
//           return;
//         }
//         this.hotelSearch.rooms = quantity;
//         break;
//       }
//       case 'people': {
//         this.hotelSearch.adults = quantity;
//         break;
//       }
//     }

//     this.passenger = `${this.hotelSearch.adults} người, ${this.hotelSearch.rooms} phòng`;
//   };

//   // fn on clicked outside
//   onClickedOutside = (e: Event, mode: string = '') => {

//     switch (mode) {
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

//   // fn get current position
//   getCurrentPosition = (): void => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {

//         this.destination = `Khách sạn gần tôi`;
//         this.selectedDestination = {
//           name: this.destination,
//           code: 'current-position',
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         };
//         this.isDestinationShow = false;

//       });
//     }
//   };
// }
