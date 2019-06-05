import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, ViewEncapsulation, ViewChild, ElementRef, HostListener} from '@angular/core';
import {trigger, transition, animate, style, state} from '@angular/animations';
import {AppBase} from '../../../../app.base';
import {HotelRepo} from '../../../../common/repos/index';
import {CSTORAGE} from '../../../../app.constants';
import {SeoService, StorageService} from '../../../../common/services';
import { HotelDatePickerPopup } from 'app/components/popup';


import { HotelFilterPopup } from 'app/components/hotel/filter-popup/hotel-filter.popup';
import { HotelLocationSelectorPopup } from '../../components/location-selector/hotel-location-selector.popup';

import * as moment from 'moment';
import { HotelSearch, Hotel, HotelFilterOptions, HotelMapMaker, HotelLocation } from 'app/common';

declare var window: any;

@Component({
  selector: 'app-hotel-result-mobile',
  templateUrl: './hotel-result-mobile.component.html',
  styleUrls: ['./hotel-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        visibility: 'visible',
        //transition: 'all .25s ease-out',
        transform: 'translate(-14px, -100%)',
      })),
      state('hide', style({
        visibility: 'hidden',
        transform: 'translate(-50%, 0%)',
        //transition: 'all .25s ease-in-out'
      })),
      transition('show <=> hide', animate('0.25s ease-in-out')),
    ])
  ]
})
export class HotelResultMobileComponent extends AppBase {

  @ViewChild(HotelFilterPopup) hotelFilterPopup: HotelFilterPopup;
  @ViewChild(HotelLocationSelectorPopup) locationSelectorPopup: HotelLocationSelectorPopup;
  @ViewChild(HotelDatePickerPopup) hotelDatePickerPopup: HotelDatePickerPopup;

  header: any = {};
  params: any = {};
  hotelSearch: any = new HotelSearch();

  loadingScreen: boolean = true;
  isLoading: boolean = false;

  hotels: Array<Hotel> = [];
  nights: number = 0;
  lastScrollTop: number = 0;

  filterCounter: number = 0;
  filter: any = {};
  filterOptions: HotelFilterOptions = new HotelFilterOptions();

  marker = {
    display: true,
    nameHotel: '',
    priceHotel: 0
  };
  markers: HotelMapMaker[] = [];

  lat: number = 51.678418;
  lng: number = 7.809007;

  selectedHotel: any = {};
  stateIconMap = 'show';

  navigationSubscription: any = null;
  selectedMarker: any = null;

  isGetFilter = false;

  sorts: any = [ ];

  dateOptions = {
    single: false,
    startOfWeek: 1
  };

  selectedDate: any = {
    start: moment().add(1, 'day'),
    end: moment().add(2, 'day')
  };

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _hotelRepo: HotelRepo,
              private _storage: StorageService,
              private _seo: SeoService,
              private _el: ElementRef) {
    super();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    //this.showHideMapIcon();
    const header = $('.header.header-mobile');
    const container = $('.wrapper');
    const checkDay = $('.check-days');

    if ($(window).scrollTop() > 0) {
      header.addClass('fixed-header');
      container.css({
        marginTop: header.outerHeight()
      });
      checkDay.addClass('custom-shadow');
    } else {
      header.removeClass('fixed-header');
      container.removeAttr('style');
      checkDay.removeClass('custom-shadow');
    }
  }

  ngOnInit() {

    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.offset = 0;
        this.hotels = [];
        this.filter = {};
        this.filterCounter = 0;
      }
    });

    this._activatedRoute.queryParams.subscribe(params => {
      this.handleRouteParams(params);
      this.onGetSelectedDate(params);
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  };

  // fn back to
  back = () => {
    window.history.back();
  };

  //on get history
  onGetSelectedDate(params: any) {
    this.selectedDate.start = params.checkIn;
    this.selectedDate.end = params.checkOut;
  };

  //list sort
  sortsData(e: any = []) {
    this.sorts = e;
  }

  //show hide map icon
  showHideMapIcon() {
    // if (window.pageYOffset > this.lastScrollTop
    //   && window.pageYOffset > 0
    //   || (window.scrollY + window.innerHeight == document.querySelector('body'))) {
    //   this.stateIconMap = 'hide';
    // } else {
    //   this.stateIconMap = 'show';
    // }
    // this.lastScrollTop = window.pageYOffset;
  };

  // fn handle route params
  handleRouteParams = (params: any): void => {

    this.header = params;
    this.nights = Number(moment(params.checkOut).diff(moment(params.checkIn), 'days'));
    this.params = params;

    this.hotelSearch = new HotelSearch(Object.assign({}, params, {
      destination: new HotelLocation(params)
    }));

    this.getHotels();
  };

  // fn hashing filter-popup-popup from query params;
  handleFilter = (params: any): void => {

    for (let key in params) {

      let value = params[key];

      switch (key.toLowerCase()) {
        case 'sortindex': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'prices':
        case 'stars': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
        case 'hoteltypes':
        case 'hotelfacilities':
        case 'areas': {

          if (this.utilityHelper.isNullOrUndefined(this.filter['others'])) {
            this.filter['others'] = {};
          }

          this.filter['others'][key] = params[key].split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });

          break;
        }
      }
    }
  };

  // fn scroll window
  onScrollDown = (): void => {
    if (!this.isLoading) {
      this.offset += this.limit;
      this.getHotels();
    }
  };

  // search hotel
  getHotels() {
    this.handleFilter(this.params);
    return this._hotelRepo
      .search(Object.assign({}, this.hotelSearch, {
        sortIndex: !!this.params.sortIndex ? this.params.sortIndex : 0,
        filterOptions: this.filter
        //stayInfo: new HotelStayInfo(this.hotelSearch)
      }), this.offset, this.limit).pipe().subscribe(
        (success: any) => {
          this.hotels = this.hotels.concat(success.data.hotels.map(hotel => new Hotel(hotel)));
          this.nights = success.data.nights;
          this.loadingScreen = false;
          [this.lat, this.lng] = [this.hotels[0].latitude, this.hotels[0].longitude];
          this.isLoading = false;
          if (!success.data.hotels.length && !!this.offset) {
            this.offset -= this.limit;
          }
          this.isGetFilter = true;
        },
        (error: any) => {
          this.loadingScreen = false;
          this.isLoading = false;
          this.isGetFilter = true;
        }
      )
      // .then(
      //   (res: any) => {
      //     this.hotels = this.hotels.concat(res.data.hotels.map(hotel => new Hotel(hotel)));
      //     this.nights = res.data.nights;
      //     this.loadingScreen = false;
      //     this.onCalcListLocations(this.hotels);
      //     this.isLoading = false;
      //     if (!res.data.hotels.length && !!this.offset) {
      //       this.offset -= this.limit;
      //     }
      //     this.isGetFilter = true;
      //   },
      //   (errors: Array<Error> = []) => {
      //     this.loadingScreen = false;
      //     this.isLoading = false;
      //     this.isGetFilter = true;
      //   }
      // );
  }

  // fn on submit filter-popup-popup
  onSubmitFilter = ($event: any): void => {

    this.filter = $event;
    this.offset = 0;
    this.loadingScreen = true;
    this.hotels = [];

    this.updateParamsToRoute(this.utilityHelper.convertObjectToQueryParams(this.filter));
  };

  // fn on update filter-popup-popup counter
  onUpdateFilterCounter = ($event: any) => {
    this.filterCounter = $event;
  };

  // fn on append params to router
  updateParamsToRoute = (params: any = {}) => {
    let queryParams = Object.assign({}, this.hotelSearch, params, {code: this.hotelSearch.destination.code});
    queryParams.roomOccupancies = this.utilityHelper.hashingRoomOccupanciesToParams(queryParams.roomOccupancies);
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(queryParams)
    });
  };

  //-----------------Map-----------------
  //change view style
  onChangeView() {
    let queryParams = Object.assign({}, this.hotelSearch, this.params, {code: this.hotelSearch.destination.code});
    this._router.navigate(['/hotel/result/map'], {
      queryParams: queryParams
    })
  };

  // fn select on hotel marker
  selectHotelMarker({target: marker}, hotel: any) {

    this.marker.nameHotel = hotel.name;
    this.marker.priceHotel = hotel.salePrice;

    this.selectedHotel = hotel;

    marker.nguiMapComponent.openInfoWindow('iw', marker);

  };

  resetSearchData() {
    this.loadingScreen = true;
    this.isGetFilter = false;
    this.offset = 0;
  }

  //open filter
  openFilter() {
    this.hotelFilterPopup.show();
  }

  // fn on select hotel
  onSelectHotel = (hotel: any) => {
    this._storage.setItem(CSTORAGE.HOTEL, hotel);
    this.hotelSearch.destinationCode = this.hotelSearch.destination.code;
    let searchParam = Object.assign({}, this.hotelSearch, {roomOccupancies: this.utilityHelper.hashingRoomOccupanciesToParams(this.hotelSearch.roomOccupancies)})
    this._router.navigate([`/hotel/${hotel.code}/detail`], {
      queryParams: this.utilityHelper.buildQueryParams(searchParam)
    });
  };

  //Location Popup
  changeArrival() {
    this.locationSelectorPopup.show();
  }
  //Change location
  selectLocation = (e) => {
    this.resetSearchData();
    let queryParams = Object.assign({}, this.header, e);
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: queryParams
    });
  };

  //open popup change date
  openChangeDatePopup() {
    this.hotelDatePickerPopup.show();
  }

  //select date
  onSelectDate(e) {
    this.resetSearchData();
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: Object.assign({}, this.header, {
        checkIn: e.start.format("YYYY-MM-DD"),
        checkOut: e.end.format("YYYY-MM-DD")
      })
    });
  };

  //on select sort
  onSelectSort(index: number = 0) {
    if(index != this.header.sortIndex) {
      this.resetSearchData();
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: Object.assign({}, this.header, {
          sortIndex: index
        })
      });
    }
  }


}






