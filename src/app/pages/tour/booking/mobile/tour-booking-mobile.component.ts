import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {AppPage} from '../../../../app.base';
import {
  BookingTour,
  StorageService,
  TourRepo,
  Security,
  Tour,
  Spinner,
  TourDeposit,
  Error
} from '../../../../common/index';
import {CAPP, CSTORAGE} from '../../../../app.constants';
import {ToastrService} from 'ngx-toastr';
import {ConfirmBackPopup} from '../../../../components/popup';
import {TourDepositPopup} from '../../../../components/index';

@Component({
  selector: 'app-tour-booking-mobile',
  templateUrl: './tour-booking-mobile.component.html',
  styleUrls: ['./tour-booking-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourBookingMobileComponent extends AppPage {

  @ViewChild(ConfirmBackPopup) confirmPopup: ConfirmBackPopup;
  @ViewChild(TourDepositPopup) tourDepositPopup: TourDepositPopup;

  isExpired: boolean = false;

  contactForm: FormGroup;
  otherForm: FormGroup;
  billForm: FormGroup;

  segments: Array<any> = [];
  point: number = 0;
  priceSummary: any;
  isInternational: boolean = false;

  couponMode: string = '';

  couponCode = '';
  selectedPoint: number = 0;

  requestId: string = null;
  totalPrice: number = 0;

  bookingTour: BookingTour = new BookingTour();

  tourDepositItems: Array<TourDeposit> = [];

  error: any = {
    coupon: [],
    point: []
  };

  contact: any = {};
  bill: any = {};
  passengers: Array<any> = [];

  isInvalid: boolean = false;
  totalPassenger: number = 0;
  tour: Tour = new Tour();

  counter: number = 0;

  constructor(protected _router: Router,
              private _fb: FormBuilder,
              protected _tourRepo: TourRepo,
              protected _security: Security,
              protected _toastr: ToastrService,
              protected _storage: StorageService,
              protected _spinner: Spinner,
              protected _location: Location,
  ) {
    super();
  }

  ngOnInit() {

    this.tour = new Tour(this._storage.getItem(CSTORAGE.TOUR));
    this.isInternational = this.tour.isInternational;

    this.bookingTour = new BookingTour(this._storage.getItem(CSTORAGE.TOUR_BOOKING));

    this.totalPassenger = _.sum([
      Number(this.bookingTour.adults),
      Number(this.bookingTour.children),
      Number(this.bookingTour.infants),
    ]);

    this.ngFormInit();
    this.onLoadHistory();
    this.getSummaryPrice();
  }

  ngAfterViewInit() {

  }

  // fn form initial
  ngFormInit = (): void => {
    this.billForm = this._fb.group({});
    this.otherForm = this._fb.group({});
    this.contactForm = this._fb.group({});
  };

  // fn fill data
  onLoadHistory = (): void => {

    if (!this.bookingTour) {
      this._router.navigate(['/tour/search']);
    }

    this.couponCode = this.bookingTour.couponCode || '';
    this.selectedPoint = this.bookingTour.points || 0;

    if (!this.utilityHelper.isNullOrUndefined(this.bookingTour.contact)) {
      this.contact = this.bookingTour.contact;
    }

    if (!this.utilityHelper.isNullOrUndefined(this.bookingTour.invoiced) && this.bookingTour.invoiced) {
      this.bill = this.bookingTour.vatInvoiceInfo;
    }

    if (!this.utilityHelper.isNullOrUndefined(this.bookingTour.passengers) && this.bookingTour.passengers.length) {
      this.passengers = this.bookingTour.passengers;
    }
  };

  // fn contact change
  onContactChange = ($event: any) => {
    this.contactForm = $event;
    this.bookingTour.contact = this.contactForm.value;
    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);

  };

  // fn bill change
  onChangeBill = ($event: any) => {
    this.billForm = $event;
  };

  // fn on selected point successfully
  onSubmitPoint = (point: number = 0) => {

    this.selectedPoint = point;
    this.bookingTour.points = point;
    this.couponMode = 'point';

    if (!!point) {
      //this.couponCode = '';
      this.bookingTour.couponCode = '';
    }

    this.getSummaryPrice();
  };

  // fn on update passenger
  onUpdatePassenger = (passengers: Array<any> = []) => {

    if (this.isInternational) {
      this.passengers = passengers.map((passenger: any) => {
        return {
          National: passenger.National,
          PassportCountry: passenger.PassportCountry,
          PassportExpiry: passenger.PassportExpiry,
          PassportNumber: passenger.PassportNumber,
          Baggages: passenger.Baggages,
          DateOfBirth: passenger.DateOfBirth,
          FirstName: passenger.FirstName,
          LastName: passenger.LastName,
          PassengerType: passenger.PassengerType,
          Title: this.utilityHelper.getPassengerTitle(passenger.Title || 'MR', passenger.PassengerType),
          index: passenger.index,
        };
      });
    } else {
      this.passengers = passengers.map((passenger: any) => {
        return {
          Baggages: passenger.Baggages,
          DateOfBirth: passenger.DateOfBirth,
          FirstName: passenger.FirstName,
          LastName: passenger.LastName,
          PassengerType: passenger.PassengerType,
          Title: this.utilityHelper.getPassengerTitle(passenger.Title || 'MR', passenger.PassengerType),
          index: passenger.index,
        };
      });
    }

    this.bookingTour.passengers = this.passengers;

    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);
  };

  // fn on submit coupon
  onSubmitCoupon(code: string = '') {
    //couponCode field format: 'E922EFD4'

    this.couponCode = code;
    this.bookingTour.couponCode = code;
    this.couponMode = 'coupon';

    if (!!code) {
      this.bookingTour.points = 0;
    }

    this.getSummaryPrice();
  }

  // fn get summary price
  getSummaryPrice = () => {
    this._spinner.show('Đang cập nhật...');

    return this._tourRepo
      .getPriceSummary(this.bookingTour)
      .then(
        (res: any) => {
          this.priceSummary = res.data;
          this.requestId = res.data.requestId;

          this.getDepositList(this.requestId);

          this.totalPrice = 0;
          res.data.totalItems.map((item) => {
            this.totalPrice += item.price;
          });

          this._storage.setItem(CSTORAGE.TOUR_PRICE_SUMMARY, res.data);
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
        (errors: Array<Error> = []) => {
          this._spinner.hide();
          this.onHandleError(errors);
        }
      );
  };

  // fn get price summary
  // getPriceSummary() {

  //   this._spinner.show('Đang cập nhật...');

  //   this._tourRepo
  //     .getPriceSummary(this.bookingTour)
  //     .then(
  //       (res: any) => {

  //         this.priceSummary = res.data;

  //         this.totalPrice = 0;
  //         res.data.totalItems.map((item) => {
  //           this.totalPrice += item.price;
  //         });

  //         this._storage.setItem(CSTORAGE.TOUR_PRICE_SUMMARY, res.data);
  //         this.error = {
  //           coupon: [],
  //           point: []
  //         };

  //         switch (this.couponMode) {
  //           case 'coupon': {
  //             this.selectedPoint = 0;
  //             break;
  //           }
  //           case 'point': {
  //             this.couponCode = '';
  //             break;
  //           }
  //         }
  //         this._spinner.hide();
  //       },
  //       (errors: Array<Error> = []) => {
  //         this._spinner.hide();
  //         this.onHandleError(errors);
  //       }
  //     );
  // }

  // fn detect disable
  detectDisableSubmit = () => {
    return this.contactForm.invalid || (!this.bookingTour.isAdditionalInfo && (this.passengers.length !== this.totalPassenger));
  };

  // on redirect to tour
  onBookingTour = () => {
    // if (this.detectDisableSubmit()) {
    //   this.isInvalid = true;
    //   this._toastr.error('Vui lòng nhập đủ thông tin', 'Lỗi');
    // }
    // else {
    this.bookingTour.contact = this.contactForm.value;
    this.bookingTour.passengers = this.passengers;
    this.bookingTour.invoiced = this.billForm.value.isVAT ? this.billForm.value.isVAT : false;
    this.bookingTour.vatInvoiceInfo = this.billForm.value;
    this.bookingTour.requestId = this.requestId;

    this._storage.setItem(CSTORAGE.TOUR_REQUEST_ID, this.requestId);
    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);

    // contact default for COD
    this._storage.setItem(CSTORAGE.CONTACT_INFO, this.bookingTour.contact);
    this.onPayment();
    //}
  };

  //open deposit popup
  onOpenDepositPopup() {
    if (this.detectDisableSubmit() && this.isMobile) {
      this.isInvalid = true;
      this._toastr.error('Vui lòng nhập đủ thông tin', 'Lỗi');
    } else {
      if (this.tourDepositItems.length > 1) {
        this.tourDepositPopup.show();
      } else {
        this.bookingTour.depositCode = this.tourDepositItems[0].code;
        this.onBookingTour();
      }
    }
  };

  //fn check deposit before goto preview page
  getDepositList = (requestId: string = ''): Promise<any> => {
    return this._tourRepo
      .getTourDeposit({requestId})
      .then(
        (res: any) => {
          this.tourDepositItems = (res.data || []).map((item: any) => new TourDeposit(item));
        },
        (errors: Error[] = []) => {
          this.onHandleError(errors);
        }
      );
  };

  //on submit data from deposit popup
  onSubmitDeposit = (depositCode: string): void => {
    this.bookingTour.depositCode = depositCode;
    this.onBookingTour();
  };


  // fn payment tour
  async onPayment() {

    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút.');

    if (this.counter === 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau.', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
      return;
    }

    try {
      const res: any = await this._tourRepo
        .makeReservationTour(Object.assign({}, this.bookingTour, {
          passengers: this.bookingTour.isAdditionalInfo ? [] : this.bookingTour.passengers
        }));

      switch (res.statusCode) {
        // pending
        case 0: {

          this.counter++;
          setTimeout(() => {
            this.onPayment();
          }, CAPP.PENDING * 1000);
          break;
        }
        // success
        case 1: {
          // this._storage.setItem(CSTORAGE.RESERVATION_CODE, res.reservationCode, false);

          this._router.navigate(['/payment'], {
            queryParams: {
              reservationCode: res.reservationCode,
              module: 'tour'
            }
          });

          break;
        }

        // error
        default: {
          this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau', '', {
            positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
          });
          break;
        }
      }
    } catch (errors) {
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
    } finally {
      this._spinner.hide();
    }
  };

  // fn open confirm back
  openConfirmBack = () => {
    this.confirmPopup.show();
  };

  //fn confirm popup
  onSubmitConfirm($event) {
    if ($event) {
      // check authen
      if (this._security.isAuthenticated()) {
        this._location.back();
      } else {
        window.history.back();
      }
    }
  }

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
            this.bookingTour.couponCode = '';

            this.error.coupon.push(error);
            break;
          }
          case 4000:
          case 4001: {
            this.selectedPoint = 0;
            this.bookingTour.points = 0;

            this.error.point.push(error);
            break;
          }
          default: {

            switch (error.code) {
              case -11: {
                this.isExpired = true;
                break;
              }
            }

            isPopup = true;
            message = error.value;
            break;
          }
        }
      }

      if (isPopup) {
        this._toastr.error(message, 'Lỗi', {
          timeOut: 5000,
          closeButton: true,
          positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
        });
      }
    }

  };

  // fn gen request id
  generateRequestID = (callback: Function): Promise<any> => {

    return this._tourRepo
      .genRequestID(this.bookingTour)
      .then(
        (res: any) => {
          this.requestId = res.data.requestId;

          if (typeof callback === 'function') {
            callback();
          }
        },
        (errors: Error[] = []) => {

          if (typeof callback === 'function') {
            callback();
          }
        }
      );
  };


  //fn on change following info
  onFollowingInfo($event: any) {
    this.bookingTour.isAdditionalInfo = $event;
  }
}



