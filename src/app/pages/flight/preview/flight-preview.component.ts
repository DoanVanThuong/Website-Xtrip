import {Component, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';
import {CAPP, CSTORAGE} from '../../../app.constants';
import {BookingFlight, Error, Flight} from '../../../common/entities';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {StorageService, PlaneTicketRepo, Spinner} from '../../../common';
import {AppBase} from '../../../app.base';
import {PaymentChangePopup} from '../../../components/popup';
import {Location} from '@angular/common';
import {STATUS} from '../booking/desktop/flight-booking-desktop.component';

@Component({
  selector: 'app-preview-ticket',
  templateUrl: './flight-preview.component.html',
  styleUrls: ['./flight-preview.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightPreviewComponent extends AppBase {

  @ViewChild(PaymentChangePopup) confirmChangePaymentPopup: PaymentChangePopup;

  flights: Flight[] = [];
  mode: number = 1;
  tab = 'general';

  contact: any = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  };

  bookingFlight: BookingFlight;

  carriers: Array<any> = [];
  airports: Array<any> = [];

  constructor(private _router: Router,
              private _toaster: ToastrService,
              private _storage: StorageService,
              private _pTicketRepo: PlaneTicketRepo,
              private _spinner: Spinner,
              private _location: Location) {
    super();
  }

  ngOnInit() {

    if (this.isDesktop) {
      this._router.navigate(['/flight/booking']);
      return;
    }

    // detect flight
    let booking = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING);
    if (!booking) {
      this._router.navigate(['/flight/search']);
      return;
    }

    this.bookingFlight = new BookingFlight(booking);

    this.carriers = this._storage.getItem(CSTORAGE.CARRIER);
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT);

    this.mode = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING_MODE);
    this.getFlightDetail();
    this.bookingFlight = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING);

    this.passengers = this.bookingFlight.Passengers;

    this.getSummaryPrice();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const content: HTMLElement = document.querySelector('.content');
    const nav: HTMLElement = document.querySelector('.tab-review .nav');

    if (window.scrollY > 120) {
      content.classList.add('m-t-50');
      nav.classList.add('fixed');
    } else {
      content.classList.remove('m-t-50');
      nav.classList.remove('fixed');
    }
  }

  /**--------- new logic ---------**/

  pendingTime = CAPP.PENDING * 1000; // 5s

  counter: number = 0;
  summaryPrice: any = {};
  totalPrice: number = 0;
  baggagePrice: number = 0;

  passengers: any = null;

  // fn get summary price
  getSummaryPrice() {
    let priceSummary = this._storage.getItem(CSTORAGE.FLIGHT_PRICE_SUMMARY);
    this.summaryPrice = priceSummary || this._router.navigate(['/flight/search']);
    this.totalPrice = priceSummary.totalAmount;
  }

  // on click booking flight
  onBookingFlight = (): Promise<any> => {

    this.counter = 1;
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    return this._pTicketRepo
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
      this._toaster.error('Thanh toán thất bại. Vui lòng thử lại');
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

  handleError = (errors: Error[] = []) => {
    let message = 'Đã có lỗi xãy ra khi đặt vé máy bay. Vui lòng thử lại sau';

    if (errors.length) {
      message = errors[0].value || message;
    }

    this._toaster.error(message, 'Lỗi');
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
      default: { // fail
        this.counter = 0;
        this._spinner.hide();
        this._toaster.error('Thanh toán thất bại. Vui lòng thử lại', '', {
          positionClass: 'toast-top-right',
          timeOut: 3000
        });
        break;
      }
    }
  };

  //************** New Structure ******************/
  //get Location name by location code
  getLocationName(location) {
    let arrayAirports: any = [];
    arrayAirports = this.airports;
    var result = _.map(arrayAirports, function (o: any) {
      if (o.code == location)
        return o;
    });
    result = _.without(result, undefined);
    return result[0].location;
  }

  //get detail flight data
  getFlightDetail() {
    let flight1 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1) || this._router.navigate(['/flight/search']);
    this.flights.push(new Flight(flight1));

    if (Number(this.mode) === 2) {
      let flight2 = this._storage.getItem(CSTORAGE.FLIGHT_2WAY2);
      this.flights.push(new Flight(flight2));
    }
  }

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
          this.onAcceptPriceChanged(reserve.reservationCode);
        },
        cancel: () => {
          window.history.go(this.flights.length > 1 ? -4 : -3);
        }
      }
    }, {
      backdrop: 'static'
    });
  };

  // fn on accept change price
  onAcceptPriceChanged = (code: string): Promise<any> => {

    this._spinner.show();

    return this._pTicketRepo
      .acceptChangePrice(code)
      .then(
        (res: any) => {
          this._spinner.hide();
          this._router.navigate(['/payment'], {
            queryParams: {
              reservationCode: code,
              module: 'flight'
            }
          });
        },
        (errors: Error[] = []) => {
          this._spinner.hide();

          let message = 'Đã có lỗi xãy ra. Vui lòng thử lại';
          if (errors.length) {
            message = errors[0].errorMessage;
          }

          this._toaster.error(message, '', {
            positionClass: this.isDesktop ? 'toast-top-right' : 'toast-bottom-full-width',
          });
        }
      );
  };
}
