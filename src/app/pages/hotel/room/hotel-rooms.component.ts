import {Router, ActivatedRoute} from '@angular/router';
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';

import * as moment from 'moment';
import {DeviceService} from '../../../common/services';

import {AppPage} from '../../../app.base';
import {HotelRepo, StorageService,  Spinner, Room, HotelSearch} from '../../../common/index';
import {CSTORAGE} from '../../../app.constants';
import {ToastrService} from 'ngx-toastr';
import {DateSelectorPopup} from '../../../components/popup';
import {combineLatest} from 'rxjs';
import {map} from "rxjs/operators";

const SCROLLER_THEME = 'mobiscroll';
const MOBISCROLLER_BUTTON: any = [
  {text: 'Hủy', handler: 'cancel', cssClass: 'btn btn-cancel-outline mn-w-90'},//Cancel Button
  {}, //Clear Button (not using in this)
  {text: 'Đồng ý', handler: 'set', cssClass: 'btn btn-main mn-w-90'} //Accept Button
];

@Component({
  selector: 'hotel-room',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelRoomComponent extends AppPage {

  @ViewChild(DateSelectorPopup) dateSelectorPopup: DateSelectorPopup;

  param: any = {};
  rooms: Room[] = [];
  night: number = 0;
  isShowLoading = true;

  hotelSearch: HotelSearch = new HotelSearch({
    adults: 1,
    rooms: 1,
    checkIn: moment().add(1, 'day').format('YYYY-MM-DD'),
    checkOut: moment().add(2, 'day').format('YYYY-MM-DD')
  });

  selectedDate: any = {
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(1, 'day').format('YYYY-MM-DD')
  };
  dateOptions: any = {
    single: false,
    startOfWeek: 1
  };
  checkIn: string = '';

  roomValue = [1, 1];
  roomsList = Array.from({length: 8}, (v, k) => k + 1);
  passengers = Array.from({length: 30}, (v, k) => k + 1);

  constructor(private router: Router,
              private _activatedRoute: ActivatedRoute,
              protected _hotelRepo: HotelRepo,
              private _storage: StorageService,
              private _toast: ToastrService,
              protected _device: DeviceService,
              private _spinner: Spinner) {
    super();
    this.setDeviceMode(_device);
  }

  ngOnInit() {
    
    combineLatest(
      this._activatedRoute.params,
      this._activatedRoute.queryParams
    )
      .pipe(
        map(([params, qParams]) => ({...params, ...qParams}))
      )
      .subscribe((param: any) => {
        this.param = param;
        if(this.isMobile) {
          this.hotelSearch = new HotelSearch(Object.assign({}, this.param, {hotelCode: this.param.code}));
          this.getRooms(this.param);
          this.selectedDate = {
            start: moment(this.param.checkIn),
            end: moment(this.param.checkOut)
          };
          let checkIn = moment(this.param.checkIn);
          let checkOut = moment(this.param.checkOut);
          this.night = checkOut.diff(checkIn, 'day');
          this.checkIn = `${checkIn.format('DD/MM')} - ${checkOut.format('DD/MM')} (${this.night} đêm)`;
        } else {
          this.router.navigate([`hotel/${this.param.code}/detail`], {queryParams: this.param});
        }
      });
  }

  // fn get list rooms detail
  getRooms = (params: any): Promise<any> => {
    this._spinner.show('Vui lòng chờ');

    return this._hotelRepo
      .getRooms(Object.assign({
        hotelCode: params.code
      }, this.param))
      .then(
        (res: any) => {

          this.rooms = res.data.rooms.map(room => new Room(room));
          this.night = res.data.nights;

          this.isShowLoading = false;
          this._spinner.hide();
        },
        (errors) => {
          this._toast.error(errors, '');
        }
      );
  };

  // fn redirect to booking hotel
  goToBookingHotel = (room: Room): void => {

    this._storage.setItem(CSTORAGE.ROOM_BOOKING, {
      selectedValue: room.selectedValue,
      couponCode: '',
      points: 0
    });

    this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);

    this._storage.setItem(CSTORAGE.ROOM, room);
    this._storage.setItem(CSTORAGE.HOTEL_SEARCH, this.param);
    this.router.navigate([`/hotel/booking`]);
  };

  //select date event
  onSelectDate = ($event: any): void => {

    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
        checkIn: moment($event.start).format('YYYY-MM-DD'),
        checkOut: moment($event.end).format('YYYY-MM-DD')
      }))
    });
  };

  // fn show date picker
  onShowDatePicker = () => {
    this.dateSelectorPopup.show();
  };

  //-------------Change room--------------
  //room and customer Options
  roomScrollerOptions: any = {
    theme: SCROLLER_THEME,
    buttons: MOBISCROLLER_BUTTON,
    lang: 'vi',
    display: 'bottom',
    rows: 3,
    wheels: [
      [{
        circular: false,
        data: this.roomsList,
        label: 'Số phòng'
      }, {
        circular: false,
        data: this.passengers,
        label: 'Số khách'
      }]
    ],
    showLabel: true,
    minWidth: 150,
    cssClass: 'md-daterange scroller-passenger',
    formatValue: function (data) {
      return `${data[0]} phòng - ${data[1]} khách`;
    }
  };

  //on change room event
  onChangeRoom = ($event: any): void => {
    let _wheel = $event.inst._tempWheelArray;
    if (_wheel[0] > _wheel[1]) {
      this._toast.error('Số phòng phải nhỏ hơn hoặc bằng số khách', '', {
        positionClass: 'toast-top-right'
      });
      this.roomValue = [_wheel[1], _wheel[1]];
    }
  };

  //on set room event
  onSetRoom = ($event: any): void => {

    let _wheel = $event.inst._wheelArray;

    this.router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.hotelSearch, {
        rooms: _wheel[0],
        adults: _wheel[1]
      }))
    });
  };


}



