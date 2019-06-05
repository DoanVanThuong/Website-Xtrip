import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {AppPage} from '../../../../../app.base';
import { Spinner, StorageService} from '../../../../../common/services';
import {CancellationPopup} from '../../../../../components/popup';
import {BookingRepo, Error, HotelReservation, HotelRepo} from '../../../../../common';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {BOOKING_STATUS, PAYMENT_METHOD} from '../../../../../app.constants';
import {makeStateKey, TransferState} from '@angular/platform-browser';

const HOTEL = makeStateKey('BOOKING_HOTEL');

@Component({
  selector: 'booking-hotel-detail-mobile',
  templateUrl: './booking-hotel-detail-mobile.component.html',
  styleUrls: ['./booking-hotel-detail-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingHotelDetailMobileComponent extends AppPage {

  @ViewChild('cancellationPopup') cancellationPopup: CancellationPopup;

  code: string = '';
  hotel: HotelReservation = null;
  url: string = '';
  isLoading: boolean = false;
  isExpired: boolean = false;
  isPriceCollapse: boolean = true;

  METHOD: any = PAYMENT_METHOD;
  STATUS: any = BOOKING_STATUS;

  constructor(protected _spinner: Spinner,
              protected _bookingRepo: BookingRepo,
              private _activatedRoute: ActivatedRoute,
              private _transferState: TransferState,
              protected _router: Router,
              protected _toast: ToastrService,
              private _location: Location,
              protected _hotelRepo: HotelRepo,
              protected _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.code = params.code;
      this.getHotel(this.code);
    });

    // get next route
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    });
  }

  ngOnDestroy() {
    if (this.url.includes('payment/result') && !this.url.includes('mode=change-method')) {
      this._router.navigate(['/']);
    }
  }

  // on get hotel detail
  getHotel = (code: string = '') => {

    const hotel = this._transferState.get(HOTEL, null);

    if (!!hotel) {
      this.hotel = new HotelReservation(hotel);
    } else {

      this.isLoading = true;

      return this._bookingRepo
        .getBookedHotelDetail(code)
        .then(
          (res: any) => {
            this.isLoading = false;

            this.hotel = new HotelReservation(res.data);
          }, (errors: Error[] = []) => {

            this.isLoading = false;

            let message = 'Đã có lỗi xãy ra.';

            if (errors.length) {
              message = errors[0].value;
            }
            this._toast.error(message, 'Lỗi', {
              positionClass: this.isDesktop ? 'toast-top-right' : 'toast-full-bottom'
            });

            this._location.back();
          }
        );
    }
  };

  // fn on expired to keep place
  onExpired = () => {

  };

  // fn back
  back() {
    this._location.back();
  }

  // fn submit change payment
  submitChangePayment = () => {
    this.getHotel(this.code);
  };

  // fn on clipboard success
  onClipboardSuccess = (message: string = ''): void => {
    this._toast.success(message);
  };

}
