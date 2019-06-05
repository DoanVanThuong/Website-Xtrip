import { Component, ViewEncapsulation } from '@angular/core';
import { HotelBookingMobileComponent } from '../mobile/hotel-booking-mobile.component';
import { CSTORAGE } from '../../../../app.constants';
import { Error, Room } from '../../../../common';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-booking-desktop',
  templateUrl: 'hotel-booking-desktop.component.html',
  styleUrls: ['hotel-booking-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelBookingDesktopComponent extends HotelBookingMobileComponent {

  isLoading: boolean = false;
  room: Room = new Room();

  isExpired: boolean = false;
  contactForm: FormGroup;
  otherForm: FormGroup;
  billForm: FormGroup;

  priceSummary: any;

  totalPrice: number = 0;
  error: any = {
    coupon: [],
    point: []
  };
  isInvalid: boolean = false;

  bill: any = {};
  contact: any = {};

  counter: number = 0;

  selectedPoint: number = 0;

  ngOnInit() {

    let booking = this._storage.getItem(CSTORAGE.ROOM_BOOKING);
    const room = this._storage.getItem(CSTORAGE.ROOM);

    if (!booking) {
      this._router.navigate(['/hotel/search']);
      return;
    }

    this.bookingRoom = booking;

    this.onFormInit();

    this.getRoomDetail(room.selectedValue);

    this.generateRequestID(() => {
      this.getSummaryPrice();
    });
    this.fillDataHistory();
  }

  // fn get room detail
  getRoomDetail = (selectedValue: string = ''): Promise<any> => {

    return this._hotelRepo
      .getRoomDetail(selectedValue)
      .then(
        (res: any) => {
          this.room = new Room(res.data.room);
        },
      );
  };

  // fn get summary price
  getSummaryPrice() {

    this._spinner.show('Đang cập nhật ...');

    return this._hotelRepo
      .getBookingSummaryPrice({
        requestId: this.requestId
      })
      .then(
        (res: any) => {

          this.priceSummary = res.data;
          this.point = res.data.points;
          this.totalPrice = _.sumBy(res.data.totalItems, 'price');

          this._spinner.hide();
        }, (errors: Error[] = []) => {
          this._spinner.hide();
          this.onHandleError(errors);
        });
  }


  // fn gen request id
  generateRequestID = (callback: Function): Promise<any> => {
    return this._hotelRepo
      .genRequestID({
        selectedValue: this.bookingRoom.selectedValue
      })
      .then(
        (res: any) => {
          this.requestId = res.data.requestId;

          if (callback instanceof Function) {
            callback();
          }
        },
        (errors: Error[] = []) => {
          if (callback instanceof Function) {
            callback();
          }
        }
      );
  };

  fillDataHistory = (): void => {

    let bookingInfo = this._storage.getItem(CSTORAGE.ROOM_BOOKING_INFO);

    if (!!bookingInfo) {
      if (!this.utilityHelper.isNullOrUndefined(bookingInfo.bookData)) {
        if (!this.utilityHelper.isNullOrUndefined(bookingInfo.bookData.contact)) {
          this.contact = bookingInfo.bookData.contact;
        }

        if (!this.utilityHelper.isNullOrUndefined(bookingInfo.bookData.representer)) {
          this.representer = bookingInfo.bookData.representer;
        }
      }

      if (!this.utilityHelper.isNullOrUndefined(bookingInfo.invoiced) && bookingInfo.invoiced) {
        this.bill = bookingInfo.vatInvoiceInfo;
      }
    }
  };

  // fn form init
  onFormInit = () => {
    this.contactForm = this._fb.group({});
    this.otherForm = this._fb.group({});
    this.billForm = this._fb.group({});
  };

  // fn contact change
  onContactChange = ($event: any) => {
    this.contactForm = $event;
    this.bookingHotel.bookData.contact = this.contactForm.value;
    this._storage.setItem(CSTORAGE.ROOM_BOOKING_INFO, this.bookingHotel);
  };

  // fn booking to other change
  onBookOtherChange = ($event: any): void => {
    this.otherForm = $event;
  };

  // on detect disable
  detectDisableSubmit = () => {
    return this.isExpired || this.contactForm.invalid || this.otherForm.invalid || this.billForm.invalid || this.otherForm.invalid;
  };

  onBookingHotel() {
    this.payment(this.bookingHotel);
  }

  // fn on handle error
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
            this.bookingRoom.couponCode = '';

            this.error.coupon.push(error);
            break;
          }
          case 4000:
          case 4001: {
            this.selectedPoint = 0;
            this.bookingRoom.points = 0;

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
        if (this._device.isMobile()) {
          this._toastr.error(message, 'Lỗi', {
            timeOut: 5000,
            closeButton: true
          });
        }
        else {
          this.toastrErrorSettingDesktop(message);
        }
      }
    }

  };

  payment(data: any) {
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');
    this._hotelRepo
      .bookHotel(Object.assign({}, data, this.bookingRoom, { requestId: this.requestId })).toPromise()
      .then(
        (res: any) => {

          switch (res.statusCode) {
            case 0: {
              // pending
              this.counter++;
              setTimeout(() => {
                this.payment(data);
              }, 10 * 1000); // 10s
              break;
            }
            case 1: {
              // success
              this._spinner.hide();

              this._storage.removeItem(CSTORAGE.ROOM_BOOKING);
              this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);
              this._storage.setItem(CSTORAGE.RESERVATION_CODE, res.reservationCode, false);

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
              if (this._device.isMobile()) {
                this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau');
              }
              else {
                this.toastrErrorSettingDesktop(res.errors[0].value);
              }
              this.counter = 0;
              break;
            }
          }
        },
        (errors: any) => {
          this._spinner.hide();
          this.toastrErrorSettingDesktop(errors.errors[0].value);
        }
      );
  }

  //toastr setting for desktop
  toastrErrorSettingDesktop(message) {
    this._toastr.error(message, 'Lỗi', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
    });
  }
}


