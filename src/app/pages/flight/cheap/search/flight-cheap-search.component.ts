import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CSTORAGE, MOBISCROLL_CONFIG} from './../../../../app.constants';
import {AppPage} from './../../../../app.base';
import {FlightSearch, StorageService} from '../../../../common/index';
import {FlightLocationSelectorPopup} from '../../../../components';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-flight-cheap-search',
  templateUrl: './flight-cheap-search.component.html',
  styleUrls: [
    '../flight-cheap.component.less',
    '../../search/flight-search.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FlightCheapSearchComponent extends AppPage {

  @ViewChild('popupOriginLocation') originPopup: FlightLocationSelectorPopup;
  @ViewChild('popupDestinationLocation') destinationPopup: FlightLocationSelectorPopup;

  params: any = {};

  dataObj = {
    start: '',
    end: '',
    date: '',
    enddate: '',
    numberPassenger: '',
    typeTicket: '',
    placeholderDate: ''
  };

  searchParams = new FlightSearch({
    RoundTrip: false,
    Adult: 1
  });

  numberPassenger = [1, 0, 0];

  //Scroller Pasenger Options
  passengerScrollerOptions: any = Object.assign({}, MOBISCROLL_CONFIG, {
    display: 'bottom',
    wheels: [
      [{
        circular: false,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        label: 'Người lớn'
      },
        {
          circular: false,
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          label: 'Trẻ em'
        },
        {
          circular: false,
          data: [0, 1, 2, 3, 4],
          label: 'Em bé'
        }]
    ],
    minWidth: 90,
    formatValue: function (data) {
      return `${data[0]} người lớn${data[1] === 0 ? '' : `, ${data[1]} trẻ em`}${data[2] === 0 ? '' : `, ${data[2]} em bé`}`;
    }
  });

  constructor(private _router: Router,
              private activatedRoute: ActivatedRoute,
              private _toastr: ToastrService,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {

      this.params = params;

      this.searchParams = new FlightSearch(Object.assign(this.searchParams, params));

      this.findCheapFlightWith();
    });
  }

  ngAfterViewInit() {

  }

  // fn find flight cheap from list
  findCheapFlightWith = (): void => {
    let flights = this._storage.getItem(CSTORAGE.FLIGHT_CHEAP);

    for (let index in flights) {
      let flight = flights[index];

      if (flight.origin === this.searchParams.Origin && flight.destination === this.searchParams.Destination) {
        this.dataObj.start = `${flight.originAirport.name} (${flight.origin})`;
        this.dataObj.end = `${flight.destinationAirport.name} (${flight.destination})`;
        break;
      }
    }
  };

  // fn swap
  clickSwap() {
    let temp = this.dataObj.start;
    this.dataObj.start = this.dataObj.end;
    this.dataObj.end = temp;

    let temp2 = this.searchParams.Origin;
    this.searchParams.Origin = this.searchParams.Destination;
    this.searchParams.Destination = temp2;
  }

  // fn on search cheap ticket
  onSearchTicket() {
    this._router.navigate(['/flight/cheap-flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(this.searchParams)
    });
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

  // on select location start
  onSelectStart(location: any) {
    // store history
    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: `${location.name} (${location.code})`,
      code: location.code
    });

    this.dataObj.start = `${location.name} (${location.code})`;
    this.searchParams.Origin = location.code;
  }

  // on select location end
  onSelectEnd(location: any) {
    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: `${location.name} (${location.code})`,
      code: location.code
    });

    this.dataObj.end = `${location.name} (${location.code})`;
    this.searchParams.Destination = location.code;
  }

  //on change passenger wheel
  onChangePassenger(e) {
    this.checkValidationPassenger(e.inst._tempWheelArray);
  }

  // fn check valid passenger
  checkValidationPassenger(currentArray: any) {
    if (currentArray[0] + currentArray[1] > 9) {
      this._toastr.error('Tổng số hành khách người lớn + trẻ em không lớn hơn 9', '', {
        positionClass: 'toast-top-right'
      });
      this.numberPassenger = [1, 0, 0];
    }
    if (currentArray[2] > currentArray[0]) {
      this._toastr.error('Số hành khách em bé phải nhỏ hoặc bằng với số hành khách người lớn', '', {
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
    return !!this.dataObj.start && !!this.dataObj.end;
  };
}
