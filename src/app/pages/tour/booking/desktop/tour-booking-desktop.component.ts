import {Component, ViewEncapsulation} from '@angular/core';
import {TourBookingMobileComponent} from '../mobile/tour-booking-mobile.component';
import {Tour, BookingTour, TourJourney, TourPackage, Error, TourDeposit} from '../../../../common';
import {CSTORAGE, CAPP} from '../../../../app.constants';

@Component({
  selector: 'app-tour-booking-desktop',
  templateUrl: './tour-booking-desktop.component.html',
  styleUrls: ['./tour-booking-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourBookingDesktopComponent extends TourBookingMobileComponent {

  journey: TourJourney = new TourJourney();
  package: TourPackage = new TourPackage();

  counter: number = 0;
  pendingTime: number = CAPP.PENDING * 1000;

  ngOnInit() {

    this.tour = new Tour(this._storage.getItem(CSTORAGE.TOUR));
    this.isInternational = this.tour.isInternational;

    this.bookingTour = new BookingTour(this._storage.getItem(CSTORAGE.TOUR_BOOKING));

    this.totalPassenger = _.sum([
      Number(this.bookingTour.adults),
      Number(this.bookingTour.children),
      Number(this.bookingTour.infants),
    ]);

    this.onLoadHistory();
    this.generateRequestID(() => {
      this.getSummaryPrice();
    });

    this.getTourJourney();
    this.getTourPackage();

  }

  // fn get summary price
  getSummaryPrice = (): Promise<any> => {
    return this._tourRepo
      .getBookingSummaryPrice({
        requestId: this.requestId
      })
      .then(
        (res: any) => {

          this.priceSummary = res.data;
          this.point = res.data.points;
          this.totalPrice = _.sumBy(res.data.totalItems, 'price');
          this.getDepositList(this.requestId);
          this._storage.setItem(CSTORAGE.TOUR_PRICE_SUMMARY, res.data);
          this._spinner.hide();
        },
        (errors: Array<Error> = []) => {
          this._spinner.hide();
          this.onHandleError(errors);
        }
      );
  };


  // fn get tour journey
  async getTourJourney() {
    try {
      const res: any = await this._tourRepo.getTourJourney(this.tour.code);
      this.journey = new TourJourney(res.data);
    } catch (error) {
    }

  };

  // fn get package tour
  async getTourPackage() {
    try {
      const res: any = await this._tourRepo.getTourPackage(this.tour.code);
      this.package = new TourPackage(res.data);
    } catch (error) {
    }

  }

  // fn on update passenger
  onUpdatePassenger = (passengers: Array<any> = []) => {
    this.passengers = passengers;

    this.bookingTour.passengers = passengers.map((passenger: any) => {
      return Object.assign(passenger, {
        Title: this.utilityHelper.getPassengerTitle(passenger.Title || '', passenger.PassengerType)
      });
    });
    if (this.bookingTour.passengers) {
      // this.isValidFllowingInfo = true;
    }

    this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);
  };

  //fn submit to payment
  onSubmitBookTour() {

    this.totalPassenger = this.bookingTour.adults + this.bookingTour.children + this.bookingTour.infants;

    // if (this.detectDisableSubmit()) {
    //   this.isInvalid = true;
    //   this._toastr.error('Vui lòng nhập đủ thông tin', 'Lỗi',
    //     {
    //       positionClass: 'toast-top-right'
    //     });
    // } else {

      this.bookingTour.contact = this.contactForm.value;
      this.bookingTour.passengers = this.passengers;
      this.bookingTour.requestId = this.requestId;

      this._storage.setItem(CSTORAGE.TOUR_REQUEST_ID, this.requestId);
      this._storage.setItem(CSTORAGE.TOUR_BOOKING, this.bookingTour);

      // contact default for COD
      this._storage.setItem(CSTORAGE.CONTACT_INFO, this.bookingTour.contact);

      //storage price summary
      this._storage.setItem(CSTORAGE.TOUR_PRICE_SUMMARY, this.priceSummary);

      this.onPayment2();
    // }
  }

  // fn payment tour
  async onPayment2() {

    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    if (this.counter === 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau.', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
      return;
    }

    try {

      const res: any = await this._tourRepo.makeReservationTour(this.bookingTour);
      switch (res.statusCode) {
        case 0: {
          // pending
          this.counter++;
          setTimeout(() => {
            this.onPayment();
          }, this.pendingTime); // 10s
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
          this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau', 'Lỗi', {
            positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
          });
          break;
        }
      }
    }
    catch (errors) {
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại', 'Lỗi', {
        positionClass: this.isMobile ? 'toast-bottom-full-width' : 'toast-top-right'
      });
    }
    finally{
      this._spinner.hide();
    }
  };

  //on deposit
  onDeposit() {
    if (this.detectDisableSubmit()) {
      this.isInvalid = true;
      this._toastr.error('Vui lòng nhập đủ thông tin', 'Lỗi',
        {
          positionClass: 'toast-top-right'
        });
    } 
    else {
      if (this.tourDepositItems.length > 1) {
        this.tourDepositPopup.show();
      }
      else {
        this.bookingTour.depositCode = this.tourDepositItems[0].code;
        this.onSubmitBookTour();
      }
    }
  }

  //on submit data from deposit popup
  onSubmitDeposit = (depositCode: string): void => {
    this.bookingTour.depositCode = depositCode;
    this.onSubmitBookTour();
  };
}
