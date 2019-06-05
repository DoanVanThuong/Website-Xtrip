import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CSTORAGE, CWEEKS_SHORT, CMONTHS, MOBISCROLL_CONFIG} from '../../../app.constants';
import {StorageService} from '../../../common/index';
import {AppPage} from './../../../app.base';
import * as moment from 'moment';

import {ToastrService} from 'ngx-toastr';

import {FlightLocationSelectorPopup} from '../../../components/flight/location-selector/flight-location-selector.popup';
import {FlightSearch} from '../../../common/entities';
import {DateSelectorPopup} from '../../../components/popup';

@Component({
  selector: 'app-flight-search-ticket',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class FlightSearchComponent extends AppPage {

  @ViewChild(DateSelectorPopup) dateSelectorPopup: DateSelectorPopup;
  @ViewChild('popupOriginLocation') originPopup: FlightLocationSelectorPopup;

  dateOptions: any = {
    single: true,
    startOfWeek: 1,
  };

  isRoundTrip: boolean = false;

  searchParams = new FlightSearch();

  type = '';//type: origin, destination

  //object data to view plane ticket
  dataObj: any = {
    start: '',
    end: '',
    date: '',
    enddate: '',
    placeholderDate: ''
  };

  selectedDate = {
    start: null,
    end: null
  };

  constructor(private _router: Router,
              private _toaster: ToastrService,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    if (this.isDesktop) {
      this._router.navigate(['/flight/result']);
      return;
    }

    this.onLoadHistory();
  }

  //Show location selector
  showLocationPopup(type) {
    this.type = type;
    this.originPopup.show();
  }

  // fn on show date picker
  onShowDatePicker = () => {
    this.dateSelectorPopup.show();
  };

  //function swap origin <-> destinatio
  clickSwap() {
    let temp = this.dataObj.start;
    this.dataObj.start = this.dataObj.end;
    this.dataObj.end = temp;

    let temp2 = this.searchParams.Origin;
    this.searchParams.Origin = this.searchParams.Destination;
    this.searchParams.Destination = temp2;
  }

  // select flight method
  onSelectMethod = (mode: number = 1) => {

    switch (mode || 1) {
      case 1:
      default: {
        // vé 1 chiều
        this.isRoundTrip = false;
        this.searchParams.RoundTrip = false;
        break;
      }
      case 2: {
        // vé 2 chiều
        this.isRoundTrip = true;
        this.searchParams.RoundTrip = true;
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
    if (location.type === 'origin') {
      // store history
      this._storage.setItem(CSTORAGE.FLIGHT_START, {
        view: `${location.name} (${location.code})`,
        code: location.code
      });

      this.dataObj.start = `${location.name} (${location.code})`;
      this.searchParams.Origin = location.code;
    }
    else {//type destination
      this._storage.setItem(CSTORAGE.FLIGHT_END, {
        view: `${location.name} (${location.code})`,
        code: location.code
      });

      this.dataObj.end = `${location.name} (${location.code})`;
      this.searchParams.Destination = location.code;
    }
  }


  // onLoadData
  onLoadHistory() {

    let start = this._storage.getItem(CSTORAGE.FLIGHT_START);
    let end = this._storage.getItem(CSTORAGE.FLIGHT_END);

    // update data object
    this.dataObj.start = !this.utilityHelper.isNullOrUndefined(start) ? start.view : '';
    this.dataObj.end = !this.utilityHelper.isNullOrUndefined(end) ? end.view : '';

    this.onSelectDateAuto();

    // update data result
    this.searchParams = new FlightSearch({
      Origin: !this.utilityHelper.isNullOrUndefined(start) ? start.code : '',
      Destination: !this.utilityHelper.isNullOrUndefined(end) ? end.code : '',
      Adult: 1,
      Child: 0,
      Infant: 0,
      RoundTrip: false
    });

  }

  // fn select default date to flight
  onSelectDateAuto() {
    let start = this._storage.getItem(CSTORAGE.FLIGHT_START_DATE, false);
    let end = this._storage.getItem(CSTORAGE.FLIGHT_END_DATE, false);

    if (!!start) {
      start = moment(start);

      let now = moment();
      let day = 60 * 60 * 24;

      // need review
      let startDiff = start.diff(now);

      if (Math.round(startDiff / day) < 1) {
        start = moment();
      }
      this.dataObj.date = start.format('YYYY-MM-DD');
      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.date);
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

  // on result ticket
  onSearchTicket() {

    if (this.isRoundTrip == false) {
      // way 1
      this.searchParams.DepartDate = this.dataObj.date;
      this.searchParams.ReturnDate = '';
    } else {
      // way 2
      this.searchParams.DepartDate = this.dataObj.date;
      this.searchParams.ReturnDate = this.dataObj.enddate;
    }

    // submit to search
    this._storage.setItem(CSTORAGE.FLIGHT_SEARCH, this.searchParams);

    this._router.navigate(['/flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(this.searchParams)
    });
  }

  // on select date
  onSelectDate(e: any) {

    this.selectedDate = Object.assign(this.selectedDate, e);
    if (this.isRoundTrip == false) {

      if (e.start.format('YYYY/MM/DD') !== moment(this._storage.getItem(CSTORAGE.FLIGHT_END_DATE)).format('YYYY/MM/DD')) {
        this.selectedDate.end = null;
        this._storage.removeItem(CSTORAGE.FLIGHT_END_DATE);
      }

      this.dataObj.date = moment(e.start).format('YYYY-MM-DD');
      this.dataObj.placeholderDate = moment(this.dataObj.date).format('DD/MM/YYYY');

      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.date);
    } else {
      this.dataObj.date = moment(e.start).format('YYYY-MM-DD');
      this.dataObj.enddate = moment(e.end).format('YYYY-MM-DD');
      this.dataObj.placeholderDate = `${moment(this.dataObj.date).format('DD/MM/YYYY')} - ${moment(this.dataObj.enddate).format('DD/MM/YYYY')}`;

      this._storage.setItem(CSTORAGE.FLIGHT_START_DATE, this.dataObj.date);
      this._storage.setItem(CSTORAGE.FLIGHT_END_DATE, this.dataObj.enddate);
    }
  }


  //--------------------------------New logic about number passenger--------------------------------
  dataPassenger: any = {
    arrayNumberPassenger: [1, 0, 0],
    passengers: []
  };
  numberPassenger = [];//array passenger ([1, 0, 0])

  //Scroller Pasenger Options
  passengerScrollerOptions: any = Object.assign(MOBISCROLL_CONFIG, {
    display: 'bottom',
    rows: 3,
    wheels: [
      [{
        circular: false,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        label: `<div>Người lớn</div><div class='font-12 sub-title-scroller p-t-4'>> 12 tuổi</div>`
      },
        {
          circular: false,
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          label: `<div>Trẻ em</div><div class='font-12 sub-title-scroller p-t-4'>2 - 12 tuổi</div>`
        },
        {
          circular: false,
          data: [0, 1, 2, 3, 4],
          label: `<div>Em bé</div><div class='font-12 sub-title-scroller p-t-4'>< 2 tuổi</div>`
        }]
    ],
    formatValue: function (data) {
      return `${data[0]} người lớn${data[1] === 0 ? '' : `, ${data[1]} trẻ em`}${data[2] === 0 ? '' : `, ${data[2]} em bé`}`;
    }
  });

  //on change passenger wheel
  onChangePassenger(e) {
    this.checkValidationPassenger(e.inst._tempWheelArray);
  }

  checkValidationPassenger(currentArray: any) {
    if (currentArray[0] + currentArray[1] > 9) {
      this._toaster.error('Tổng số hành khách người lớn + trẻ em không lớn hơn 9', '', {
        positionClass: 'toast-top-right'
      });
      this.numberPassenger = [1, 0, 0];
    }
    if (currentArray[2] > currentArray[0]) {
      this._toaster.error('Số hành khách em bé phải nhỏ hoặc bằng với số hành khách người lớn', '', {
        positionClass: 'toast-top-right'
      });
      this.numberPassenger = [1, 0, 0];
    }
  }

  //on set button passenger
  onSetPassenger(e: any) {
    let _wheelArray = e.inst._wheelArray;//array passenger -> [1, 0, 0]

    this.searchParams.Adult = _wheelArray[0];
    this.searchParams.Child = _wheelArray[1];
    this.searchParams.Infant = _wheelArray[2];
  }

  // disable button search
  onDisable = () => {
    return !!this.dataObj.start && !!this.dataObj.end && !!this.dataObj.placeholderDate;
  };

}

