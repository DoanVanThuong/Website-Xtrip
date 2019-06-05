import {Router, ActivatedRoute} from '@angular/router';
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {StorageService, TourRepo, Tour, BookingTour, Spinner, UtilityHelper} from '../../../common/index';
import {CAPP, CSTORAGE, DATE_FORMAT} from '../../../app.constants';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {PassengerInfoPopup} from '../../../components/popup';
import {Passenger} from '../../../common/entities/passenger.entity';
import * as moment from 'moment';

@Component({
  selector: 'app-tour-review',
  templateUrl: './tour-review.component.html',
  styleUrls: [
    './tour-review.component.less',
    '../search/arrival/mobile/tour-arrival-mobile.component.less',
    '../detail/mobile/tour-detail-mobile.component.less'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TourReviewComponent extends AppPage {

  @ViewChild(PassengerInfoPopup) passengerPopup: PassengerInfoPopup;

  tour: Tour = new Tour();
  bookingTour: BookingTour = new BookingTour();
  priceSummary: any = null;
  totalPrice: number = 0;

  passenger: Passenger = new Passenger();
  selectedPassengerIndex: number = -1;
  counter: number = 0;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _tourRepo: TourRepo,
              private _location: Location,
              private _toastr: ToastrService,
              private _spinner: Spinner,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this.tour = new Tour(this._storage.getItem(CSTORAGE.TOUR));
    this.bookingTour = new BookingTour(this._storage.getItem(CSTORAGE.TOUR_BOOKING));

    if (!!this.bookingTour) {
      this.getPriceSummary();
    } else {
      this._router.navigate(['/tour']);
    }
  }

  ngAfterViewInit() {

  }

  numberPeople(a, c, i) {
    return `${a} người lớn ${c > 0 ? ', ' + c + ' trẻ em' : ''} ${i > 0 ? ', ' + i + ' em bé' : ''}`;
  }


  // fn get price summary
  getPriceSummary() {

    //get price summary by new logic
    let priceSummary = this._storage.getItem(CSTORAGE.TOUR_PRICE_SUMMARY);
    this.priceSummary = priceSummary || this._router.navigate(['/tour/arrival']);
    this.totalPrice = priceSummary.totalItems[0].price;
    this.bookingTour.requestId = priceSummary.requestId;

  }

  // fn redirect to booking
  redirectToBooking = () => {
    this._location.back();
  };

  // fn open passenger info popup
  openPassengerInfoPopup = (passenger: any, index: number = 0) => {

    this.selectedPassengerIndex = index;

    let type: string = '';
    switch (passenger.PassengerType) {
      case 'ADT': {
        type = 'adult';
        break;
      }
      case 'CHD': {
        type = 'child';
        break;
      }
      case 'INF': {
        type = 'infant';
        break;
      }
    }

    this.passenger = new Passenger({
      title: passenger.Title,
      firstName: passenger.FirstName,
      lastName: passenger.LastName,
      dateOfBirth: !!passenger.DateOfBirth ? (
          this.utilityHelper.isDateWith(passenger.DateOfBirth, DATE_FORMAT.DATE)
            ? passenger.DateOfBirth
            : this.utilityHelper.convertDateWith(passenger.DateOfBirth, DATE_FORMAT.DATE))
        : '',
      passportNumber: passenger.PassportNumber,
      passportCountry: passenger.PassportCountry,
      passportExpiry: !!passenger.PassportExpiry ? (
          this.utilityHelper.isDateWith(passenger.PassportExpiry, DATE_FORMAT.DATE)
            ? passenger.PassportExpiry
            : this.utilityHelper.convertDateWith(passenger.PassportExpiry, DATE_FORMAT.DATE))
        : '',
      national: passenger.National,
      type: passenger.PassengerType === 'ADT' ? 'adult' : (passenger.PassengerType === 'CHD' ? 'child' : 'infant')
    });

    this.passengerPopup.passenger = this.passenger;
    this.passengerPopup.isInternational = this.tour.isInternational;
    this.passengerPopup.show();
  };

  // fn on update passenger
  onUpdatePassenger = ($event: Passenger) => {

    let passport = {};
    if (this.tour.isInternational) {
      passport = {
        PassportNumber: $event.passportNumber,
        PassportCountry: $event.passportCountry,
        PassportExpiry: moment($event.passportExpiry, DATE_FORMAT.DATE).format(DATE_FORMAT.VALUE),
        National: $event.national,
      };
    }

    let passenger = {
      Title: '',
      FirstName: $event.firstName,
      LastName: $event.lastName,
      DateOfBirth: !!$event.dateOfBirth ? moment($event.dateOfBirth, DATE_FORMAT.DATE).format(DATE_FORMAT.VALUE) : '',
      PassengerType: '',
    };

    switch ($event.type) {
      case 'adult': {
        passenger.PassengerType = 'ADT';
        passenger.Title = $event.title === 'Ông' ? 'MR' : $event.title === 'Bà' ? 'MRS' : 'MISS';

        break;
      }
      case 'child': {
        passenger.PassengerType = 'CHD';
        passenger.Title = $event.title === 'Bé trai' ? 'MSTR' : 'MISS';

        break;
      }
      case 'infant': {
        passenger.PassengerType = 'INF';
        passenger.Title = $event.title === 'Bé trai' ? 'MSTR' : 'MISS';
      }
    }

    this.bookingTour.passengers[this.selectedPassengerIndex] = Object.assign(this.bookingTour.passengers[this.selectedPassengerIndex], passenger, passport);

    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);
  };


  // fn payment tour
  onPayment = (): Promise<any> => {

    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    if (this.counter === 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau.', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
      return;
    }

    return this._tourRepo
      .makeReservationTour(Object.assign({}, this.bookingTour, {
        passengers: this.bookingTour.isAdditionalInfo ? [] : this.bookingTour.passengers
      }))
      .then(
        (res: any) => {

          switch (res.statusCode) {
            case 0: {
              // pending

              this.counter++;
              setTimeout(() => {
                this.onPayment();
              }, 10 * 1000); // 10s
              break;
            }
            case 1: {
              this._spinner.hide();
              this._storage.setItem(CSTORAGE.RESERVATION_CODE, res.reservationCode, false);

              this._router.navigate(['/payment'], {
                queryParams: {
                  reservationCode: res.reservationCode,
                  module: 'tour'
                }
              });

              break;
            }
            default: {
              this._spinner.hide();
              this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau', '', {
                positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
              });
              break;
            }
          }
        },
        (errors: any) => {
          this._toastr.error('Thanh toán thất bại. Vui lòng thử lại', 'Lỗi', {
            positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
          });
          this._spinner.hide();
        }
      );
  };
}



