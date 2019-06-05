import {ActivatedRoute, Router} from '@angular/router';
import {Component, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {Airline, Airport, Error, FlightReservation} from '../../../../../common/entities';
import {BookingRepo} from '../../../../../common/repos';
import {DeviceService, Spinner} from '../../../../../common/services';
import {AppBase} from '../../../../../app.base';
import {Passenger} from '../../../../../common/entities/passenger.entity';
import {isPlatformBrowser, Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BookingFlightReportPopup} from '../../components/report-popup/report.popup';
import {BookingPdfReportPopup} from '../../components/report-pdf-popup/pdf-report.popup';
import {BOOKING_STATUS, MODULE} from '../../../../../app.constants';

@Component({
  selector: 'app-flight-booked-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingFlightTicketComponent extends AppBase {

  @ViewChild(BookingFlightReportPopup) reportPopup: BookingFlightReportPopup;
  @ViewChild(BookingPdfReportPopup) pdfPopup: BookingPdfReportPopup;

  code: string = '';
  flight: FlightReservation;
  passengers: Passenger[] = [];
  isLoading: boolean = false;

  airlines: Airline[] = [];
  airports: Airport[] = [];

  STATUS: any = BOOKING_STATUS;
  MODULE: any = MODULE;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _bookingRepo: BookingRepo,
              private _device: DeviceService,
              private _spinner: Spinner,
              private _toastr: ToastrService,
              private _location: Location,
              @Inject(PLATFORM_ID) private platformId: Object) {
    super();

    this.setDeviceMode(_device);
  }


  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;

      this.getFlightDetail(this.code);
    });
  }

  back = (): void => {
    this._location.back();
  };

  // fn get flight detail
  getFlightDetail = (code: string = null): Promise<any> => {

    this.isLoading = true;

    return this._bookingRepo
      .getBookedFlightDetail(this.code)
      .then(
        (res: any) => {

          if (isPlatformBrowser(this.platformId) && !res.data.reservation) {
            this._router.navigate(['/404']);
          }

          this.flight = new FlightReservation(res.data.reservation);

          this.airlines = res.data.airlines.map((airline) => new Airline(airline));
          this.airports = res.data.airports.map((airport) => new Airport(airport));

          this.isLoading = false;
        },
        (errors: any) => {

          this.handleError(errors);
          this.isLoading = false;
        }
      );
  };

  // fn handle error
  handleError = (errors: Error[] = []): void => {
    const error: Error = new Error(errors[0]);
    this._toastr.error(error.value);

    if (isPlatformBrowser(this.platformId)) {
      this._router.navigate(['/']);
    }
  };



  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field || 'name');
  };

  // fn get airline with
  getAirlineWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airlines, 'code', field || 'name');
  };

  //get rest time
  restTime = (item?: any): string => {
    return `Nghỉ tại <strong>${item.origin}</strong> trong <strong>${this.utilityHelper.durationTime(item.timePending)}</strong>`;
  };

  // fn on open report
  onOpenReport = (): void => {
    this.reportPopup.show();
  };

  // fn on slect report
  onSelectReport = (type: string): void => {
    switch (type) {
      case 'pdf': {
        this.onOpenRequestEmail();
        break;
      }
    }
  };

  // fn on open send ticket via email
  onOpenRequestEmail = (): void => {
    this.pdfPopup.show();
  };

}



