import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FlightBookingMobileComponent} from '../mobile/flight-booking-mobile.component';
import {CAPP, CSTORAGE} from '../../../../app.constants';
import {Error} from '../../../../common/entities';
import {PaymentChangePopup} from '../../../../components/popup';

export const STATUS: any = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
  PRICE_CHANGED: 3
};

@Component({
  selector: 'app-flight-booking-desktop',
  templateUrl: './flight-booking-desktop.component.html',
  styleUrls: ['./flight-booking-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightBookingDesktopComponent extends FlightBookingMobileComponent {

  @ViewChild(PaymentChangePopup) confirmChangePaymentPopup: PaymentChangePopup;

  counter: number = 0;
  pendingTime: number = CAPP.PENDING * 1000;

  // Processing data about Passenger Info
  onUpdatePassenger = (passengers: Array<any> = []): void => {

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

  // fn on detect disable submition
  detectDisableSubmit = () => {
    return this.contactForm.invalid || this.bookingFlight.Passengers.length < this.totalPassenger;
  };

  // fn book flight
  onBookingFlight = (): void => {

    if (this.detectDisableSubmit()) {
      this.isInvalid = true;
      this._toastr.error('Vui lòng nhập thông tin hành khách', '', {
        positionClass: 'toast-top-right'
      });

      return;
    }

    this.counter = 1;
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    // store contact info
    this._storage.setItem(CSTORAGE.CONTACT_INFO, this.bookingFlight.Contact);

    // store price summary
    this._storage.setItem(CSTORAGE.FLIGHT_PRICE_SUMMARY, this.summaryPrice);

    // storage request id
    this._storage.setItem(CSTORAGE.FLIGHT_REQUEST_ID, this.requestId);


    this._pTicketRepo
      .bookFlight(this.bookingFlight)
      .then(
        (res: any) => {
          this.handleReserve(res);
        },
        (errors: Error[] = []) => {
          this._spinner.hide();
          this.handleError(errors);
        }
      );
  };

  // fn on check booking
  onCheckBooking = (reservationCode: string = ''): Promise<any> => {

    if (this.counter > 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại', '', {
        positionClass: 'toast-top-right'
      });
      return;
    }

    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    return this._pTicketRepo
      .checkBookingFlight(reservationCode)
      .then(
        (res: any) => {
          this.handleReserve(res);
        },
        (errors: Error[] = []) => {
          this._spinner.hide();
          this.handleError(errors);
        }
      );
  };

  // fn handle error
  handleError = (errors: Error[] = []) => {
    let message = 'Đã có lỗi xãy ra khi đặt vé máy bay. Vui lòng thử lại sau';

    if (errors.length) {
      message = errors[0].value || message;
    }

    this._toastr.error(message, 'Lỗi', {
      positionClass: 'toast-top-right'
    });
  };

  // fn handle reserve
  handleReserve = (reserve: any = {}): void => {

    switch (reserve.statusCode) {
      case STATUS.PENDING: {
        // pending

        setTimeout(() => {

          this._spinner.hide();
          this.onCheckBooking(reserve.reservationCode);
          this.counter++;
        }, this.pendingTime);
        break;
      }
      case STATUS.SUCCESS: { // success
        this._storage.setItem(CSTORAGE.RESERVATION_CODE, reserve.reservationCode, false);

        this._spinner.hide();

        this._router.navigate(['/payment'], {
          queryParams: {
            reservationCode: reserve.reservationCode,
            module: 'flight'
          }
        });
        break;
      }
      case STATUS.PRICE_CHANGED: { // change price
        this._spinner.hide();
        this.onOpenPaymentChangePopup(reserve);
        break;
      }
      case STATUS.FAILED:
      default: {
        this._spinner.hide();

        this.counter = 0;
        this._toastr.error('Thanh toán thất bại. Vui lòng thử lại', '', {
          positionClass: 'toast-top-right'
        });
        break;
      }
    }
  };

  // fn open payment change popup
  onOpenPaymentChangePopup = (reserve: any = {}): void => {

    return this.confirmChangePaymentPopup.open({
      title: 'Thông báo',
      message: `Đã có sự điều chỉnh từ Hãng hàng không. Mức giá hiện tại là <span class="text-main font-bold">${this.utilityHelper.formatCurrency(reserve.totalPrice || 0)} <span class="text-underline">đ</span> </span>. Bạn có muốn tiếp tục thanh toán?`,
      btnAcceptLabel: 'Tiếp tục',
      btnCancelLabel: 'Tìm vé khác',
      isClose: true,
      event: {
        accept: () => {

          this.onBookingFlight();
        },
        cancel: () => {
          this._location.back();
        }
      }
    }, {
      backdrop: 'static'
    });
  };
}
