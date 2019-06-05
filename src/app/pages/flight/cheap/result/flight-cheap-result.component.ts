import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import * as moment from 'moment';
import {AppPage} from '../../../../app.base';
import {Location} from '@angular/common';
import {CSTORAGE, MOBISCROLL_CONFIG} from '../../../../app.constants';
import {Spinner, StorageService, FlightRepo, FlightSearch} from '../../../../common/';
import {ReferencePricePopup} from '../../../../components/popup';

@Component({
  selector: 'app-flight-cheap-result',
  templateUrl: './flight-cheap-result.component.html',
  styleUrls: ['./../flight-cheap.component.less', '../../search/flight-search.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightCheapResultComponent extends AppPage {

  @ViewChild(ReferencePricePopup) rpPopup: ReferencePricePopup;

  flights: Array<any> = [];
  origin: string = '';
  destination: string = '';

  loadingVisible = true;
  params: any = {};
  selectedDate: any = moment().add(1, 'month');

  counter = 0;

  flightSearch = new FlightSearch({
    Cheap: true,
    RoundTrip: false,
    Month: this.selectedDate.month() + 1,
    Year: this.selectedDate.year()
  });

  searchParam = {
    originAirport: {
      code: '',
    },
    destinationAirport: {
      code: '',
    },
    adults: 1,
    children: 0,
    infants: 0,
    year: moment().year(),
    month: moment().month() + 1
  };

  // select month options
  mobilScrollOptions: any = Object.assign({}, MOBISCROLL_CONFIG, {
    wheels: [
      [{
        circular: false,
        data: this.utilityHelper.getNext12Months(false),
        label: 'Chọn tháng'
      }]
    ],
    minWidth: 280,
    onSet: (e, ins) => {
      this.onSelectedDate(e);
    }
  });

  navigationSubscription: any = null;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _flightRepo: FlightRepo,
              private _storage: StorageService,
              private  _location: Location,
              private _spinner: Spinner) {
    super();
  }


  ngOnInit() {

    this.navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.flights = [];
      }
    });

    this._activatedRoute.queryParams.subscribe((params) => {

      const now = moment().add(1, 'month');
      this.params = params;

      this.flightSearch = new FlightSearch(Object.assign(this.flightSearch, params, {
        Month: this.params.Month ? Number(this.params.Month) : (now.month() + 1),
        Year: this.params.Year || now.year(),
      }));

      this.searchParam = Object.assign(this.searchParam, {
        originAirport: {
          code: this.flightSearch.Origin,
        },
        destinationAirport: {
          code: this.flightSearch.Destination
        },
        month: Number(this.flightSearch.Month),
        year: Number(this.flightSearch.Year),
        adults: this.flightSearch.Adult,
        children: this.flightSearch.Child,
        infants: this.flightSearch.Infant,
      });

      this.selectedDate = moment([
        this.searchParam.year,
        this.searchParam.month - 1,
        1
      ]);

      this.getCheapFlights();
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // fn back to
  backTo = (): void => {
    this._location.back();
  };

  // fn on select flight
  onSelectFlight = ($event: any) => {

    this.flightSearch.DepartDate = moment($event.date).format('YYYY-MM-DD');

    this._storage.setItem(CSTORAGE.FLIGHT_SEARCH, this.flightSearch);
    this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, {
      Adult: this.searchParam.adults,
      Child: this.searchParam.children,
      Infant: this.searchParam.infants,
      Points: 0,
      CouponCode: '',
      Segments: [],
      Baggage: null,
      Passengers: []
    });

    this._router.navigate(['/flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(this.flightSearch)
    });
  };

  // fn get flight cheaps
  getCheapFlights(params: any = {}) {

    this._spinner.show('Đang lấy dữ liệu vé...');
    this.counter = 0;

    this._flightRepo
      .searchCheapFlights(this.searchParam)
      .then(
        (res: any) => {
          if (res.isPending && this.counter <= 3) {
            this.getCheapFlights();
          } else {
            this.flights = res.calendar.map(item => {

              return {
                date: moment(item.departDate),
                data: item,
                price: item.price,
                isLowest: item.isLowest,
                isDisabled: item.isDisabled
              };
            });

            this.origin = res.originLocation;
            this.destination = res.destinationLocation;

            this.loadingVisible = false;
            this.counter = 0;

            this._spinner.hide();
          }
        }
      );
  }

  // on seltected date changes
  onSelectedDate = (event: any = null) => {

    this.updateParamsToRoute({
      Month: moment(this.selectedDate).month() + 1,
      Year: moment(this.selectedDate).year()
    });

  };

  // fn on append params to router
  updateParamsToRoute = (params: any = {}) => {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this.utilityHelper.buildQueryParams(Object.assign({}, this.params, params))
    });
  };

  // fn open detail
  openDetail = () => {
    this.rpPopup.show();
  };

}
