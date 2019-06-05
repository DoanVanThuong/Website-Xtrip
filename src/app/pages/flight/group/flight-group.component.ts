import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {StorageService, FlightRepo} from '../../../common';
import {ToastrService} from 'ngx-toastr';
import {FlightLocationSelectorPopup} from '../../../components/flight/location-selector/flight-location-selector.popup';
import {CPATTERN, CSTORAGE} from '../../../app.constants';
import * as moment from 'moment';
import {DateSelectorPopup} from '../../../components/popup';

@Component({
  selector: 'app-flight-booking-group',
  templateUrl: './flight-group.component.html',
  styleUrls: ['../search/flight-search.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class FlightGroupComponent {

  @ViewChild(DateSelectorPopup) dateSelectorPopup: DateSelectorPopup;
  @ViewChild('popupOriginLocation') originPopup: FlightLocationSelectorPopup;
  @ViewChild('popupDestinationLocation') destinationPopup: FlightLocationSelectorPopup;

  constructor(private fb: FormBuilder,
              public activatedRoute: ActivatedRoute,
              private _storage: StorageService,
              private router: Router,
              private _toaster: ToastrService,
              private _flightRepo: FlightRepo) {
  }

  dateOptions = {
    single: true,
    startOfWeek: 1,
  };
  isRoundTrip: boolean = false;

  selectedDate = {
    start: null,
    end: null
  };

  //object data to view plane ticket
  dataObj = {
    start: '',
    end: '',
    startdate: '',
    enddate: '',
    numberPassenger: '',
    placeholderDate: ''
  };

  form: FormGroup;
  lastName: AbstractControl;
  firstName: AbstractControl;
  email: AbstractControl;
  mobileNumber: AbstractControl;

  ngFormInit = () => {
    this.form = this.fb.group({
      lastName: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      mobileNumber: ['', Validators.compose([Validators.pattern(CPATTERN.PHONE_REGEX)])],
      email: ['', Validators.compose([Validators.pattern(CPATTERN.EMAIL_REGEX)])]
    });
    this.firstName = this.form.controls.firstName;
    this.lastName = this.form.controls.lastName;
    this.email = this.form.controls.email;
    this.mobileNumber = this.form.controls.mobileNumber;
  };

  ngOnInit() {
    this.ngFormInit();
  }

  //Show location selector
  showLocationPopup(type) {
    if (type === 'origin') {
      this.originPopup.show();
    }
    else {
      this.destinationPopup.show();
    }
  }

  // fn on show date picker
  onShowDatePicker = () => {
    this.dateSelectorPopup.show();
  };

  //swap origin & destination
  clickSwap() {
    let temp = this.dataObj.start;
    this.dataObj.start = this.dataObj.end;
    this.dataObj.end = temp;
  }

  // select flight method
  onSelectMethod = (mode: number = 1) => {
    switch (mode || 1) {
      case 1:
      default: {
        this.isRoundTrip = false;
        break;
      }
      case 2: {
        this.isRoundTrip = true;
        break;
      }
    }

    //switch option calendar 1 way or 2 ways
    if (this.isRoundTrip) {
      this.dateOptions = {
        single: false,
        startOfWeek: 1,
      };

      this.selectedDate = {
        start: null,
        end: null
      };
    }
    else {
      this.dateOptions = {
        single: true,
        startOfWeek: 1,
      };
    }

    this.onSelectDateAuto();
  };

  // on select location start
  onSelectStart(location: any) {
    // store history
    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: `${location.name} (${location.code})`,
      code: location.code
    });
    this.dataObj.start = `${location.name} (${location.code})`;
  }

  // on select location end
  onSelectEnd(location: any) {
    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: `${location.name} (${location.code})`,
      code: location.code
    });

    this.dataObj.end = `${location.name} (${location.code})`;
  }

  // on select date
  onSelectDate = (e: any = {}) => {

    this.selectedDate = Object.assign(this.selectedDate, e);

    if (this.isRoundTrip == false) {

      if (e.start.format('YYYY/MM/DD') !== moment(this._storage.getItem(CSTORAGE.FLIGHT_END_DATE)).format('YYYY/MM/DD')) {
        this.selectedDate.end = null;
        this._storage.removeItem(CSTORAGE.FLIGHT_END_DATE);
      }

      this.dataObj.startdate = moment(e.start).format('YYYY-MM-DD');
      this.dataObj.placeholderDate = moment(this.dataObj.startdate).format('DD/MM/YYYY');

      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.startdate);
    } else {
      this.dataObj.startdate = moment(e.start).format('YYYY-MM-DD');
      this.dataObj.enddate = moment(e.end).format('YYYY-MM-DD');
      this.dataObj.placeholderDate = `${moment(this.dataObj.startdate).format('DD/MM/YYYY')} - ${moment(this.dataObj.enddate).format('DD/MM/YYYY')}`;

      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.startdate);
      this._storage.setItem(CSTORAGE.FLIGHT_END_DATE, this.dataObj.enddate);
    }
  };

  //send request
  onSendRequest() {
    let obj = {
      roundTrip: this.isRoundTrip ? true : false,
      departPlace: this.dataObj.start,
      arrivalPlace: this.dataObj.end,
      departdate: this.dataObj.startdate,
      adults: this.dataObj.numberPassenger,
      child: 0,
      infant: 0,
      contact: this.form.value
    };

    if (this.isRoundTrip) {
      obj['returndate'] = this.dataObj.enddate;
    }

    return this._flightRepo
      .groupBooking(obj)
      .then(
        (res: any) => {
          this._toaster.success('Đã gửi yêu cầu thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất !', '', {
            positionClass: 'toast-bottom-center'
          });
          setTimeout(() => {
            this.router.navigate(['/flight/search']);
          }, 3000);
        },
        (errors: any) => {
          this._toaster.error('Có lỗi xảy ra. Vui lòng thử lại', '', {
            positionClass: 'toast-bottom-center'
          });
        }
      );
  }

  //disable button send
  onDisable = () => {
    return !!this.dataObj.start && !!this.dataObj.end && !!this.dataObj.placeholderDate && !!this.dataObj.numberPassenger && !this.form.invalid &&
      !!this.form.value.lastName && !!this.form.value.firstName && !!this.form.value.email && !!this.form.value.mobileNumber;
  };

  // fn select default date to flight
  onSelectDateAuto() {
    let start = this._storage.getItem(CSTORAGE.FLIGHT_START_DATE);
    let end = this._storage.getItem(CSTORAGE.FLIGHT_END_DATE);

    if (!!start) {
      start = moment(start);

      let now = moment();
      let day = 60 * 60 * 24;

      // need review
      let startDiff = start.diff(now);

      if (Math.round(startDiff / day) < 1) {
        start = moment();
      }
      this.dataObj.startdate = start.format('YYYY-MM-DD');
      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.startdate);
    }

    if (!this.isRoundTrip) {
      this.dataObj.placeholderDate = !!start ? start.format('DD/MM/YYYY') : '';
      this.selectedDate = {
        start: start,
        end: null
      };
    } else {
      if (moment(end).diff(start) > 0) {//case: end date > start date
        end = !!end ? moment(end) : '';
        this.selectedDate = {
          start: start,
          end: !!end ? end : null
        };
        !!end ? this.dataObj.placeholderDate = start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY') : '';
      }
      else {//case: end date < start date
        this.selectedDate = {
          start: null,
          end: null
        };
        this.dataObj.placeholderDate = '';
      }

    }
  }

}
