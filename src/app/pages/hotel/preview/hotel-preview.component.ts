import {Router, ActivatedRoute} from '@angular/router';
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Hotel, HotelRepo, Spinner, StorageService} from '../../../common/index';
import {CSTORAGE} from '../../../app.constants';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {HotelMorePopup} from '../../../components';

@Component({
  selector: 'app-hotel-preview',
  templateUrl: './hotel-preview.component.html',
  styleUrls: ['./hotel-preview.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelPreviewComponent extends AppPage {

  @ViewChild(HotelMorePopup) hotelPolicyPopup: HotelMorePopup;

  param: any;
  bookingRoom: any = {};

  hotelCode: string = '';
  hotel: Hotel = new Hotel();
  room: any;
  booker: any;

  priceSummary: any;
  totalPrice: number = 0;
  requestId: string = '';
  counter: number = 0;

  constructor(private _router: Router,
              private _spinner: Spinner,
              private _activatedRoute: ActivatedRoute,
              private _hotelRepo: HotelRepo,
              private _location: Location,
              private _storage: StorageService,
              private _toastr: ToastrService) {
    super();
  }

  ngOnInit() {

    this.getPriceSummary();

    this.hotel = this._storage.getItem(CSTORAGE.HOTEL);
    this.room = this._storage.getItem(CSTORAGE.ROOM);
    this.booker = this._storage.getItem(CSTORAGE.HOTEL_BOOKER);

    this.bookingRoom = this._storage.getItem(CSTORAGE.ROOM_BOOKING_INFO);
  }
  
  //get room detail
  getRoomDetail() {
    
  }
  // fn get price summary
  getPriceSummary() {

    this.bookingRoom = this._storage.getItem(CSTORAGE.ROOM_BOOKING);

    // this._hotelRepo
    //   .getSummaryPrice(this.bookingRoom)
    //   .then(
    //     (res: any) => {

    //       this.priceSummary = res.data;

    //       this.priceSummary.totalItems.map(item => {
    //         this.totalPrice += item.price;
    //       });

    //       this.requestId = res.data.requestId;
    //     },
    //     (errors: any) => {
    //       let message = 'Không lấy được giá phòng. Vui lòng thử lại';
    //       if (errors.length && !errors[0]) {
    //         message = errors[0].value;
    //       }

    //       this._toastr.error(message, 'Lỗi');
    //     }
    //   );
    

    //get price summary by new logic
    let priceSummary = this._storage.getItem(CSTORAGE.HOTEL_PRICE_SUMMARY);
    this.priceSummary = priceSummary || this._router.navigate(['/dat-phone-hotel/search']);
    this.priceSummary.totalItems.map(item => {
      this.totalPrice += item.price;
    });
    this.requestId = priceSummary.requestId;
    
  }

  // fn back to booking
  redirectToBooking = () => {
    this._location.back();
  };

  // fn go to payment
  onPayment() {
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    if (this.counter === 3) {
      this._spinner.hide();
      this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau.', 'Lỗi');
      return;
    }

    this._hotelRepo
      .bookHotel(Object.assign(this.bookingRoom, {requestId: this.requestId})).toPromise()
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
              // success
              this._spinner.hide();

              this._storage.removeItem(CSTORAGE.ROOM_BOOKING);
              this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);
              this._storage.setItem(CSTORAGE.RESERVATION_CODE, res.reservationCode,false);

              this._router.navigate(['/payment'], {
                queryParams: {
                  'reservationCode': res.reservationCode,
                  'module': 'hotel'
                }
              });
              break;
            }
           
            default: {
              // failed
              this._spinner.hide();
              this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau');
              this.counter = 0;
              break;
            }
          }
        },
        (errors: any) => {
          this._spinner.hide();
        }
      );
  }

  // fn open hotel policy
  openPolicy = () => {
    this.hotelPolicyPopup.show();
  };
}



