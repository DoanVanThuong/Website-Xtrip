import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {Component, ViewEncapsulation} from '@angular/core';
import {UtilityHelper, BookingRepo, Spinner, Error, FlightReservation, Airline, Airport, SeoService} from '../../../../../common';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {AppBase} from '../../../../../app.base';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';
import {isLoop} from 'tslint';

@Component({
  selector: 'booking-flight-detail-mobile',
  templateUrl: './booking-flight-detail-mobile.component.html',
  styleUrls: ['./booking-flight-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingFlightDetailMobileComponent extends AppBase {

  code: string = '';
  flight: FlightReservation = null;
  isLoading: boolean = false;

  airlines: Airline[] = [];
  airports: Airport[] = [];

  isPriceCollapse: boolean = true;
  url: string = '';

  METHOD: any = PAYMENT_METHOD;
  STATUS: any = BOOKING_STATUS;

  constructor(protected _router: Router,
              protected _spinner: Spinner,
              protected _bookingRepo: BookingRepo,
              private _activatedRoute: ActivatedRoute,
              protected _toast: ToastrService,
              private _location: Location) {
    super();
  }


  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;

      this.getFlight(params);
    });

    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
        return;
      }
    });
  }

  ngOnDestroy() {
    if (this.url.includes('payment/result') && !this.url.includes('mode=change-method')) {
      this._router.navigate(['/']);
    }
  }

  // fn back to
  back = (): void => {
    this._location.back();
  };

  //get flight data
  getFlight = (param: any): Promise<any> => {

    this._spinner.show('Vui lòng chờ...');
    this.isLoading = true;

    return this._bookingRepo
      .getBookedDetail('flight', this.code)
      .then(
        (res: any) => {
          this.flight = new FlightReservation(res.data.reservation);

          this.airlines = res.data.airlines.map((airline) => new Airline(airline));
          this.airports = res.data.airports.map((airport) => new Airport(airport));
          this.groupPassenger(this.flight);

          this.isLoading = false;
          this._spinner.hide();
        },
        (errors: any) => {
          this.handleError(errors);
          this.isLoading = false;
          this._spinner.hide();
        }
      );
  };

  //fn handle error
  handleError(errors: any) {
    const error: Error = new Error(errors[0]);
    this._toast.error(error.value, 'Lỗi');

    this._router.navigate(['/']);
  }

  isExpired = false;
  // fn on expired to keep place
  onExpired = () => {
    this.isExpired = true;
  };

  //data passenger
  arrayPassenger: any = [];

  groupPassenger(data) {
    this.arrayPassenger = _.groupBy(data.passengers, 'passengerType');
  }

  //show/hide selected tab
  tab = 'general';

  onSelectTab(e, tab) {
    this.tab = tab;
  }

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field || 'name');
  };

  // fn get airline with
  getAirlineWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airlines, 'code', field || 'name');
  };

  // fn on clipboard success
  onClipboardSuccess = (message: string = ''): void => {
    this._toast.success(message);
  };
}



