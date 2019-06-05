import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CAPP} from './../../../../app.constants';
import {CSTORAGE} from '../../../../app.constants';
import {AppBase} from '../../../../app.base';
import {StorageService, PlaneTicketRepo, Spinner, Flight, DeviceService} from '../../../../common';
import {Router} from '@angular/router';
import {ConfirmBackPopup} from '../../../../components/popup';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookingFlight} from '../../../../common/entities/index';
import {Location} from '@angular/common';

@Component({
  selector: 'app-flight-booking-mobile',
  templateUrl: './flight-booking-mobile.component.html',
  styleUrls: ['flight-booking-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightBookingMobileComponent extends AppBase {

  @ViewChild(ConfirmBackPopup) confirmPopup: ConfirmBackPopup;

  carriers: Array<any> = [];
  airports: Array<any> = [];

  point: number = 0;
  totalPassenger: number = 0;
  passenger: any = null;
  passengers: Array<any> = [];

  isInternational: boolean = false;
  couponCode: string = '';
  couponMode: string = '';

  contactForm: FormGroup;
  billForm: FormGroup;

  contact: any = {};
  bill: any = {};
  summaryPrice: any = null;
  flights: Array<Flight> = [];
  segments: Array<any> = [];
  requestId: string = null;

  isInvalid: boolean = false;

  constructor(protected _fb: FormBuilder,
              protected _storage: StorageService,
              protected _router: Router,
              protected _pTicketRepo: PlaneTicketRepo,
              protected _spinner: Spinner,
              protected _toastr: ToastrService,
              protected _location: Location,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit() {

    // detect flight
    let flight1 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1);
    let flight2 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY2);
    let booking = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING);

    if ((!flight1 && !flight2) || !booking) {
      this._router.navigate(['/flight/result']);
      return;
    }

    this.mode = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING_MODE);
    this.carriers = this._storage.getItem(CSTORAGE.CARRIER);
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT);

    this.bookingFlight = new BookingFlight(booking);
    this.totalPassenger = this.utilityHelper.sumList([
      Number(this.bookingFlight.Adult),
      Number(this.bookingFlight.Child),
      Number(this.bookingFlight.Infant)
    ]);

    this.getSummaryPrice();

    this.onFormInit();

    this.fillDataHistory();
  }

  // fn fill data history
  fillDataHistory = (): void => {

    if (!this.bookingFlight) {
      this._router.navigate(['/flight/result']);
    }

    this.couponCode = this.bookingFlight.CouponCode || '';
    this.selectedPoint = this.bookingFlight.Points || 0;

    if (!this.utilityHelper.isNullOrUndefined(this.bookingFlight.Contact)) {
      this.contact = this.bookingFlight.Contact;
    }

    if (!this.utilityHelper.isNullOrUndefined(this.bookingFlight.invoiced) && this.bookingFlight.invoiced) {
      this.bill = this.bookingFlight.vatInvoiceInfo;
    }

    if (!this.utilityHelper.isNullOrUndefined(this.bookingFlight.Passengers) && !!this.bookingFlight.Passengers.length) {
      this.passengers = this.bookingFlight.Passengers;
    }
  };

  // fn form init
  onFormInit = () => {
    this.contactForm = this._fb.group({});
    this.billForm = this._fb.group({});
  };

  // fn redirect to review ticket
  goToPreviewTicket = ($event: any): void => {

    if (this.detectDisableSubmit()) {
      this.isInvalid = true;
      if (this.isMobile) {
        this._toastr.error('Vui lòng nhập thông tin hành khách', '');
      }
    } else {
      this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, this.bookingFlight);

      // contact default for COD
      this._storage.setItem(CSTORAGE.CONTACT_INFO, this.bookingFlight.Contact);

      //storage price summary
      this._storage.setItem(CSTORAGE.FLIGHT_PRICE_SUMMARY, this.summaryPrice);
      this._router.navigate(['/flight/review']);
    }

  };

  /**------------------ new logic with new logic -------------------**/
  mode = 0;

  selectedPoint: number = 0; // selected point to pay

  minPoint: number = CAPP.MIN_POINT; // min point to selected

  // prices
  totalPrice: number = 0; // real

  // booking flight
  bookingFlight: BookingFlight = new BookingFlight();

  bookingFlightPayment: any = {
    Segments: [],
    Passengers: [],
    Contact: null,
    Points: 0,
    CouponCode: '',
    Device: {
      Id: '',
      OS: ''
    }
  };


  // fn on selected point successfully
  onSubmitPoint = (point: number = 0) => {

    this.selectedPoint = point;
    this.bookingFlight.Points = this.selectedPoint;
    this.couponMode = 'point';

    if (!!point) {
      this.bookingFlight.CouponCode = '';
      //this.couponCode = '';
    }

    this.getSummaryPrice();
  };

  // fn detect segment with flight information
  getSegmentWithFlight = (flight: any = {}, baggages: Array<any> = [], type: number = 0) => {

    return {
      flightCode: flight.flightNumber,
      flightIcon: this.getCarrierLogo(flight.carrier),
      carrierName: this.utilityHelper.findInListWith(flight.carrier, this.carriers, 'code', 'name'),
      baggages: baggages || [],
      itineraryType: type || 0
    };

  };

  // fn get carrier logo
  getCarrierLogo(code: string) {
    for (let index in this.carriers) {
      if (this.carriers[index].code === code) {
        return this.carriers[index].icon;
      }
    }
    return null;
  }

  // fn get baggage list - summary price
  error: any = {
    coupon: [],
    point: []
  };

  // fn get price summary
  getSummaryPrice() {

    this._spinner.show('Đang cập nhật ...');
    this.bookingFlightPayment.Segments = [];

    // TODO calculate baggages

    switch (Number(this.mode)) {
      case 1: {
        // ticket for 1 way

        let flight = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1);
        this.isInternational = flight.isInternational;

        this.bookingFlight.Segments = [
          {
            SelectedValue: flight.selectedValue,
            requestId: ''
          }
        ];

        this.flights = [new Flight(flight)];

        break;
      }
      case 2: {
        let flight1: any = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1);
        let flight2: any = this._storage.getItem(CSTORAGE.FLIGHT_2WAY2);
        this.isInternational = flight1.isInternational;

        this.bookingFlight.Segments = [
          {
            SelectedValue: flight1.selectedValue,
            requestId: ''
          },
          {
            SelectedValue: flight2.selectedValue,
            requestId: ''
          }
        ];

        this.flights = [new Flight(flight1), new Flight(flight2)];

        break;
      }
    }

    this._pTicketRepo
      .getSummaryPrice(this.bookingFlight)
      .then(
        (res: any) => {

          this.summaryPrice = res.data;
          this.point = res.data.points;
          this.requestId = res.data.segments[0].requestId;

          // TODO storage segment information
          res.data.segments.map((segment, index) => {
            // update segment to booking
            this.bookingFlight.Segments[index].requestId = segment.requestId;

            // update segment for baggages
            if (this.segments.length < this.bookingFlight.Segments.length) {
              this.segments.push(this.getSegmentWithFlight(this.flights[index], segment.baggageDetails, segment.itineraryType));
            }
          });

          // TODO calculate summary total
          this.totalPrice = res.data.totalAmount;

          this.error = {
            coupon: [],
            point: []
          };

          switch (this.couponMode) {
            case 'coupon': {
              this.selectedPoint = 0;
              break;
            }
            case 'point': {
              this.couponCode = '';
              break;
            }
          }

          this._spinner.hide();
        },
        (errors: any) => {
          this._spinner.hide();
          this.onHandleError(errors);
        }
      );
  }


  //________________________________________________restructure code logic between components________________________________________________

  //********************Passenger*********************/
  onContactChange = (event: any) => {
    this.contactForm = event;
    this.bookingFlight.Contact = this.contactForm.value;
    this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, this.bookingFlight);
  };

  // Processing data about Passeger Info
  onSubmitUpdatedPassenger = (passengers: Array<any> = []): void => {

    // need review
    this.passengers = passengers;

    this.bookingFlight.Passengers = passengers.map((passenger: any) => {
      return Object.assign(passenger, {
        Title: this.utilityHelper.getPassengerTitle(passenger.Title, passenger.PassengerType)
      });
    });

    this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, this.bookingFlight);

    // update price summary when passenger is updated fully
    if (passengers.length === this.totalPassenger) {
      this.getSummaryPrice();
    }
  };

  //***********************Coupon*************************/
  //received coupon code from "optional component"
  onSubmitCoupon = (couponCode: string = ''): void => {
    //couponCode field format: 'E922EFD4'

    this.couponCode = couponCode;
    this.bookingFlight.CouponCode = couponCode;
    this.couponMode = 'coupon';

    if (!!couponCode) {
      this.bookingFlight.Points = 0;
      //this.selectedPoint = 0;
    }

    this.getSummaryPrice();
  };

  // onchange bill form
  onChangeBill = ($event: any = {}): void => {
    this.billForm = $event;

    this.bookingFlight.invoiced = this.billForm.value.isVAT;
    this.bookingFlight.vatInvoiceInfo = this.billForm.value;
  };

  // fn detect disable
  detectDisableSubmit = () => {
    return this.contactForm.invalid || this.billForm.invalid || this.passengers.length < this.totalPassenger;
  };

  // fn handle error
  onHandleError = (errors: Array<any> = []) => {

    this.error = {
      coupon: [],
      point: []
    };

    let message = 'Đã cố lỗi xãy ra. Vui lòng thử lại sau.';
    let isPopup: boolean = false;

    if (errors.length) {

      for (let index in errors) {
        let error = errors[index];
        switch (error.code) {
          case 5002: {
            this.couponCode = '';
            this.bookingFlight.CouponCode = '';
            this.error.coupon.push(error);
            break;
          }
          case 4000:
          case 4001: {
            this.selectedPoint = 0;
            this.bookingFlight.Points = 0;

            this.error.point.push(error);
            break;
          }
          default: {

            isPopup = true;
            message = error.value;
            break;
          }
        }
      }

      if (isPopup) {
        this._toastr.error(message, 'Lỗi', {
          positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right',
          timeOut: 5000,
          closeButton: true
        });
      }
    }

  };

  // fn confirm back
  openConfirmBack = (): void => {
    this.confirmPopup.show();
  };

  // clean data
  onSubmitConfirm = ($event) => {
    if ($event) {
      this._storage.setItem(CSTORAGE.FLIGHT_BOOKING, new BookingFlight({
        Adult: this.bookingFlight.Adult,
        Child: this.bookingFlight.Child,
        Infant: this.bookingFlight.Infant,
      }));
      this._location.back();
    }
  };

}
