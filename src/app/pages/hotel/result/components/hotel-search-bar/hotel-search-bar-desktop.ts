import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ElementRef, PLATFORM_ID, Inject, ContentChild, TemplateRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelRepo, StorageService, HotelSearch, Hotel, HotelLocation } from '../../../../../common';
import { CSTORAGE, DATE_FORMAT } from '../../../../../app.constants';
import { AppBase } from '../../../../../app.base';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig, BsLocaleService, defineLocale } from 'ngx-bootstrap';
import { viLocale } from '../../../../../../assets/localize/vi';
import { isPlatformBrowser } from "@angular/common";

defineLocale('vi', viLocale);

/* search bar */
@Component({
  selector: 'app-hotel-search-bar-desktop',
  templateUrl: './hotel-search-bar-desktop.html',
  styleUrls: ['./hotel-search-bar-desktop.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelSearchBarDesktopComponent extends AppBase {

  // @Input('params') params: any = {};
  @Input() reClick?: boolean = false;
  @Input() mode?: number = 0; //0: result; 1: detail;
  @Input() hotel?: Hotel = new Hotel;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild('hotelSubSearchBar') hotelSubSearchBar: TemplateRef<any>;

  params: any = {};

  isDestinationShow: boolean = false;
  isPassengerShow: boolean = false;
  isRoomShow: boolean = false;

  checkIn: Date[] = [];
  checkInOutTime: string = '';
  destination: string = '';
  night: number = 0;
  passenger: string = '1 phòng, 1 khách';

  timeout: any = null;

  isDestinationTyping: boolean = false;

  destinations: Array<any> = [];
  nights: Array<any> = [];
  favoriteLocations: Array<any> = [];

  selectedDestination: any = {};
  selectedLocations: Array<any> = [];

  hotelSearch: HotelSearch = new HotelSearch({
    rooms: 1,
    adults: 1,
    checkIn: moment().add(1, 'day').format(DATE_FORMAT.VALUE),
    checkOut: moment().add(2, 'day').format(DATE_FORMAT.VALUE)
  });

  locale: string = 'vi';
  datePickerOptions: Partial<BsDatepickerConfig> = {
    minDate: new Date(),
    containerClass: 'theme-orange theme-custom m-t-15',
    dateInputFormat: 'dd/MM/yyyy',
    showWeekNumbers: false
  };

  roomsAdults: any = {
    roomOccupancies: null
  };

  selectedRoomType: string = 'your-self';

  constructor(private _hotelRepo: HotelRepo,
    private _storage: StorageService,
    private _toaster: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _ele: ElementRef,
    private _localeService: BsLocaleService,
    @Inject(PLATFORM_ID) private platformID: string) {
    super();
    this._localeService.use(this.locale);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {

    // if (isPlatformBrowser(this.platformID)) {

    //   const bar = $('.hotel-search-bar');
    //   const header = $('.header');
    //   const body = $('.main-body');
    //   const submenu = $('.hotel-sub-search-bar');

    //   if ($(window).scrollTop() > header.innerHeight()) {
    //     bar.addClass('fixed-top');
    //     submenu.addClass('fixed-top');

    //     body.css({
    //       marginTop: bar.innerHeight() + submenu.innerHeight()
    //     });
    //     submenu.css({
    //       top: bar.innerHeight()
    //     })
    //   } else {
    //     bar.removeClass('fixed-top');
    //     submenu.removeClass('fixed-top');
    //     body.removeAttr('style');
    //     submenu.removeAttr('style');
    //   }
    // }
  };

  ngOnInit() {

    this.getFavoriteLocations();
    this.getSelectedLocations();

    this._activatedRoute.queryParams.subscribe((params) => {
      this.params = params;

      // if (!_.isNull((this.params))) {
      //   this.onHandleParams(params);
      //   this.onLoadHistory();
      // }
    });
  }

  ngOnChanges() {
    if (this.reClick) {
      setTimeout(() => {
        this.isDestinationShow = true;
        this.destination = '';
      }, 500);
    }
  }

  // fn on clicked outside
  onClickedOutside = (e: Event, mode: string = '') => {

    switch (mode) {
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

  // fn handle params
  onHandleParams = (params: any = {}): void => {
    console.log(params);
    this.hotelSearch = new HotelSearch(Object.assign({}, this.hotelSearch, params));
    this.passenger = `${params.rooms || 1} phòng ${params.adults || 2} khách,`;

    const checkIn = moment(this.hotelSearch.checkIn);
    const checkOut = moment(this.hotelSearch.checkOut);

    this.checkIn = [
      new Date(checkIn.year(), checkIn.month(), checkIn.date()),
      new Date(checkOut.year(), checkOut.month(), checkOut.date()),
    ];

    this.night = moment(params.checkOut).diff(params.checkIn, 'day');
    if (this.night <= 0) {
      this.checkInOutTime = '';
      return;
    }

    this.checkInOutTime = `${moment(params.checkIn).format('DD/MM/YYYY')} - ${moment(params.checkOut).format('DD/MM/YYYY')} (${this.night} đêm)`;
  };

  // fn on open dropdown search
  openDropdownSearch = (mode: string = '') => {

    switch (mode.toLowerCase()) {
      case 'destination': {
        this.onDestinationChange(this.destination);
        this.isDestinationShow = true;
        break;
      }
      case 'passenger': {
        this.isPassengerShow = true;
        break;
      }
    }
  };

  // fn on fill data - history
  onLoadHistory = () => {

    const location = this._storage.getItem(CSTORAGE.HOTEL_DESTINATION);

    if (!!location) {
      this.destination = this.hotelSearch.name || `${location.name}, ${location.countryName}`;
      this.selectedDestination = new HotelLocation(location);
    }
  };

  // fn on submit search
  onSearch = () => {
    // this._storage.setItem(CSTORAGE.HOTEL_SEARCH, this.hotelSearch);

    if (this.params.name === this.hotel.name && this.params.name === this.destination) {
      this._router.navigate(['/hotel', this.hotel.code, 'detail'], {
        queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
          sortIndex: 0
        }))
      });
    } else {
      const param: any = this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
        latitude: this.selectedDestination.latitude,
        longitude: this.selectedDestination.longitude,
        name: this.selectedDestination.name,
        destinationType: this.selectedDestination.destinationType,
        destinationCode: this.selectedDestination.code,
      }))

      param.roomOccupancies = this.utilityHelper.hashingRoomOccupanciesToParams(this.roomsAdults.roomOccupancies);
      param.rooms = !!this.roomsAdults.roomOccupancies ? this.hotelSearch.rooms : 1;
      param.type = this.selectedRoomType;

      //support for old format modal
      param.adults = !!this.roomsAdults.roomOccupancies ? this.roomsAdults.adults : 1;

      console.log(param);
      this._router.navigate([`/hotel/result`], { queryParams: param });
    }
  };

  /* -------------------------Search Destination-------------------------*/
  // get history origin
  getSelectedLocations = () => {
    let locations = this._storage.getItem(CSTORAGE.HOTEL_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(locations) && locations.length > 0) {
      this.selectedLocations = locations;
    }
  };

  //onchange destination field
  onDestinationChange = ($event: any) => {

    clearTimeout(this.timeout);

    this.isDestinationTyping = true;

    this.timeout = setTimeout(() => {
      if ($event.length > 1) {

        return this._hotelRepo
          .getDestinationHotel($event)
          .then(
            (res: any) => {
              this.isDestinationTyping = false;
              this.destinations = res.data.map(destination => destination);
            },
            (errors: any) => {
              this.destinations = [];
              this.isDestinationTyping = false;
            }
          );
      } else if (!$event.length) {
        this.destinations = [];
        this.isDestinationTyping = false;
      }
    }, 500);
  };

  // on select origin location
  onSelectLocation = (location: any, mode: string = '') => {

    this.destination = `${location.name}, ${location.countryName}`;
    this.selectedDestination = location;
    this.isDestinationShow = false;

    this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, this.selectedDestination);

    if (!this.onDetectExistingInHistory(location.code)) {
      this.selectedLocations.push(location);
      this._storage.setItem(CSTORAGE.HOTEL_LOCATION, this.selectedLocations);
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

  // fn get favourite hotels
  getFavoriteLocations = () => {
    return this._hotelRepo
      .getFavourites()
      .then(
        (res: any) => {
          this.favoriteLocations = res.data;
        }
      );
  };

  /* -------------------Date------------------- */

  // fn on select date
  onSelectedDate = ($event: any): void => {

    if (!$event.length || $event.length < 2) {
      return;
    }

    const checkIn = moment($event[0]);
    const checkOut = moment($event[1]);

    this.night = checkOut.diff(checkIn, 'day', true);

    if (this.night <= 0) {
      this.checkInOutTime = '';
      return;
    }

    this.checkInOutTime = `${checkIn.format('DD/MM/YYYY')} - ${checkOut.format('DD/MM/YYYY')} (${this.night} đêm)`;

    this.hotelSearch.checkIn = checkIn.format('YYYY-MM-DD');
    this.hotelSearch.checkOut = checkOut.format('YYYY-MM-DD');
  };

  //disable button search
  onDisableSubmit = (): boolean => {
    return !this.destination || !this.night || !this.passenger;
  };

  onChangeTypePassenger(data: any) {
    if (!!data.value) {
      this.onChangeRoomNumber(data.value);
      this.isRoomShow = false;
    } else {
      this.isRoomShow = true;
    }
  }

  onChangeRoomNumber(data: any) {
    console.log(data);

    this.hotelSearch.rooms = data.length;
    this.roomsAdults.roomOccupancies = data;

    const numPassenger = data.map((item: any) => Object.keys(item).map(key => item[key]))
      .map((item: any[]) => item.reduce((acc, cur) => acc + cur))
      .reduce((acc, cur) => acc + cur);

    this.roomsAdults.adults = numPassenger;
    this.passenger = `${this.hotelSearch.rooms || 1} phòng, ${numPassenger || 1} khách`;
  }

  //hash object roomOccupancies -> params search roomOccupancies (format: 1-1,2-0)
  hashingRoomOccupanciesToParams = (roomOcc: any[]) => {
    if (!!roomOcc) {
      let result = '';
      for (let i = 0; i < roomOcc.length; i++) {
        result += `${i != 0 ? ',' : ''}${roomOcc[i].adults.toString()}-${roomOcc[i].children.toString()}`
      }
      return result;
    }
    else {
      return '1-0';
    }
  }
}

@Component({
  selector: 'hotel-sub-search-bar-desktop',
  template: `
    <ng-content></ng-content>
  `
})

export class HotelSubSearchBarDesktop extends AppBase {

  constructor() {
    super();
  }
}
