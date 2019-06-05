import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, AbstractControl, Validators, FormBuilder} from '@angular/forms';

import {StorageService, SeoService, HotelSearchQueryParams} from './../../../common/index';
import {CSTORAGE, CWEEKS, MOBISCROLL_CONFIG} from '../../../app.constants';
import {AppBase} from '../../../app.base';
import { HotelLocationSelectorPopup } from '../components/location-selector/hotel-location-selector.popup';
import { HotelDatePickerPopup } from 'app/components/popup';
import { HotelRoomPopupComponent } from '../detail/components/popup/room/hotel-room.popup';

import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'search-hotel',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelSearchComponent extends AppBase {

  @ViewChild(HotelLocationSelectorPopup) locationSelectorPopup: HotelLocationSelectorPopup;
  @ViewChild(HotelDatePickerPopup) dateSelectorPopup: HotelDatePickerPopup;
  @ViewChild(HotelRoomPopupComponent) roomPopup: HotelRoomPopupComponent;

  @ViewChild('nightVariable')
  myRefNightVarable: any;

  form: FormGroup;
  destination: AbstractControl;

  checkIn: string = '';
  selectedDate: any = {
    start: moment().add(1, 'day'),
    end: moment().add(2, 'day')
  };
  selectedDestination: any = {};

  hotelSearch: HotelSearchQueryParams = new HotelSearchQueryParams({
    rooms: 1,
    roomOccupancies: '1-0',
    checkIn: this.selectedDate.start.format('YYYY-MM-DD'),
    checkOut: this.selectedDate.end.format('YYYY-MM-DD')
  });

  dateOptions = {
    single: false,
    startOfWeek: 1
  };

  roomValue = [1, 1];
  night: number = 0;
  
  roomsAdults: any = {
    roomOccupancies: null
  };

  constructor(private _router: Router,
              private fb: FormBuilder,
              private _toastr: ToastrService,
              private _seo: SeoService,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.ngFormInit();

    this.onLoadHistory();

    // handle check-in time
    const checkIn = this.selectedDate.start;
    const checkOut = this.selectedDate.end;
    this.night = this.utilityHelper.calcDay(checkIn, checkOut);

    this.checkIn = `${CWEEKS[checkIn.day()]}, ${checkIn.format('DD/MM')} - ${CWEEKS[checkOut.day()]}, ${checkOut.format('DD/MM')} (${this.night} đêm)`;

    this._seo
      .setDeepLink(`hotel/search`);
  }

  //init form
  ngFormInit = () => {
    this.form = this.fb.group({
      destination: ['', Validators.compose([Validators.required])]
    });

    this.destination = this.form.controls.destination;
  };

  // fn load history
  onLoadHistory = () => {

    const location = this._storage.getItem(CSTORAGE.HOTEL_DESTINATION);

    if (!!location) {
      this.destination.setValue(`${location.name}${location.countryName ? `, ${location.countryName}` : ''}`);
      this.selectedDestination = location;
    }
  };

  //______________Location_____________
  //open popup location selector
  openLocationSelector() {
    this.locationSelectorPopup.show();
  }

  // fn emit location selector
  emitLocation = (location: any): void => {
    this.destination.setValue(`${location.name}${location.countryName ? `, ${location.countryName}` : ''}`);
    this.selectedDestination = location;
    this._storage.setItem(CSTORAGE.HOTEL_DESTINATION, location);

    //this.hotelSearch.destination = location;
  };

  //emit from history
  emitLocationHistory(location: any) {
    this.emitLocation(location);
    this.hotelSearch.checkIn = moment(location.checkIn).format('YYYY-MM-DD');
    this.hotelSearch.checkIn = moment(location.checkOut).format('YYYY-MM-DD');
    this.onSubmit();
  }

  // fn get current position
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let data = {
          name: 'Khách sạn gần tôi',
          code: null,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          destinationType: "MY_POINT"
        };
        this.emitLocation(data);
      }, 
      (errors: any) => {
        this._toastr.error('Không có quyền truy cập.', '', {
          positionClass: 'toast-bottom-full-width'
        });
        this.destination.setValue('');
        this.destination.clearValidators();
      });
    } else {
      this._toastr.error('Lấy vị trí hiện tại không khả dụng trên trình duyệt của bạn.', '', {
        positionClass: 'toast-bottom-full-width'
      });
    }
  }
  
  //______________Date Picker_____________
  // fn on show date picker
  onShowDatePicker = () => {
    this.dateSelectorPopup.show();
  };

  // on selected date
  onSelectDate($event: any = {}) {

    this.selectedDate = Object.assign(this.selectedDate, $event);

    const checkinDate = moment($event.start);
    const checkoutDate = moment($event.end);

    this.night = checkoutDate.diff(checkinDate, 'day');
    if (this.night <= 0) {
      this.checkIn = '';
      return;
    }
    ;

    this.checkIn = `${checkinDate.format('DD/MM/YYYY')} - ${checkoutDate.format('DD/MM/YYYY')} (${this.night} đêm)`;

    this.hotelSearch.checkIn = checkinDate.format('YYYY-MM-DD');
    this.hotelSearch.checkOut = checkoutDate.format('YYYY-MM-DD');
  }

  //______________Number Room, Customer______________
  //popup show room adult
  showRoomAdult() {
    this.roomPopup.show();
  }

  //emit room/adult
  emitRoomAdult(e: any) {
    this.roomsAdults.roomOccupancies = e;
    this.roomsAdults['sumAdults'] = _.sumBy(e, 'adults');
    this.roomsAdults['sumChildren'] = _.sumBy(e, 'children');
    this.roomsAdults['adults'] = _.sum(e.map((ob: any) => { return ob.adults + ob.children }));
    this.roomsAdults['rooms'] = e.length;
  };

  // fn on submit search hotel
  onSubmit() {
    const param: any = this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
      name: this.selectedDestination.name,
      latitude: this.selectedDestination.latitude,
      longitude: this.selectedDestination.longitude,
      destinationType: this.selectedDestination.destinationType
    }, this.selectedDestination));

    param.roomOccupancies = this.utilityHelper.hashingRoomOccupanciesToParams(this.roomsAdults.roomOccupancies);
    param.rooms = !!this.roomsAdults.roomOccupancies ? this.roomsAdults.rooms : 1;

    //support for old format modal
    param.adults = !!this.roomsAdults.roomOccupancies ? this.roomsAdults.adults : 1;
    
    this._router.navigate([`/hotel/result`], {queryParams: param});
  };

}
