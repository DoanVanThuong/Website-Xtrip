import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  HotelRepo,
  StorageService,
  TourRepo,
  Security,
  User,
  Spinner,
  BookingHotel,
  DeviceService, Error, Coupon, CouponRepo
} from '../../../../common/index';
import { AppPage } from '../../../../app.base';
import { CSTORAGE, CPATTERN, EVENT } from '../../../../app.constants';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { GlobalState } from '../../../../global.state';
import { ConfirmBackPopup } from '../../../../components/popup';
import * as _ from 'lodash';
import { takeUntil, catchError, finalize, retryWhen, flatMap, mergeMap, retry } from 'rxjs/operators';
import { Observable, interval, throwError, of } from 'rxjs';
import { HotelApplyPointPopupComponent } from '../components/hotel-apply-point-popup/hotel-apply-point.popup';
import { HotelApplyCouponPopupComponent } from '../components/hotel-apply-coupon-popup/hotel-apply-coupon.popup';
import { CouponDetailItemPopupComponent } from '../components/coupon-detail-item-popup/coupon-detail-item.popup';

enum TYPE_PROMO {
  COUPON = 'coupon',
  POINT = 'point'
}

enum TYPE_ERROR {
  ROOM_NOT_FOUND = 3004
}

@Component({
  selector: 'app-hotel-booking-mobile',
  templateUrl: './hotel-booking-mobile.component.html',
  styleUrls: ['./hotel-booking-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelBookingMobileComponent extends AppPage {

  @ViewChild(ConfirmBackPopup) confirmPopup: ConfirmBackPopup;
  @ViewChild(HotelApplyPointPopupComponent) pointPopup: HotelApplyPointPopupComponent;
  @ViewChild(HotelApplyCouponPopupComponent) couponPopup: HotelApplyCouponPopupComponent;
  @ViewChild(CouponDetailItemPopupComponent) couponDetailPopup: CouponDetailItemPopupComponent;

  contactForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  representer: AbstractControl;

  point: number = 0;
  couponCode = '';

  bookingRoom: IBookingRoom = null;
  bookingHotel: BookingHotel = new BookingHotel();

  profile: User = new User();
  coupons: Coupon[] = [];
  selectedCoupon: Coupon = new Coupon();

  requestId: string = null;

  isShowRepresenter: boolean = false;
  isLoggedIn: boolean = false;
  isEdit: boolean = true;
  isApplyPoint: boolean = false;
  isApplyCoupon: boolean = false;

  constructor(protected _fb: FormBuilder,
    protected _router: Router,
    protected _state: GlobalState,
    protected _activatedRoute: ActivatedRoute,
    protected _hotelRepo: HotelRepo,
    protected _tourRepo: TourRepo,
    private _location: Location,
    protected _security: Security,
    protected _toastr: ToastrService,
    protected _spinner: Spinner,
    protected _device: DeviceService,
    protected _storage: StorageService,
    private _couponRepo: CouponRepo
  ) {
    super();
  }

  ngOnInit() {
    const bookingRoom = this._storage.getItem(CSTORAGE.ROOM_BOOKING);
    const bookingInfo = this._storage.getItem(CSTORAGE.ROOM_BOOKING_INFO);

    if (!bookingRoom) {
      this._router.navigate(['/hotel/search']);
      return;
    }

    this.onFormInit();

    //get profile if logged in
    if (this._security.isAuthenticated()) {
      this.isLoggedIn = this._security.isAuthenticated();
      this.profile = this._security.getCurrentUser();
      this.onLoadCoupons();

      this.initFormUpdateContact(
        { firstname: this.profile.firstName, lastname: this.profile.lastName, mobilenumber: this.profile.phone, email: this.profile.email }
      );
      this.isEdit = !this.onDetectFullProfileInfo();

    } else {
      if (!!bookingInfo && !!bookingInfo.bookData) {
        // check representer info
        if (!!bookingInfo.bookData.representer) {
          this.isShowRepresenter = true;
          this.representer.setValue(bookingInfo.bookData.representer);
          this.representer.setValidators([, Validators.compose([
            Validators.required,
          ])])
        }

        this.initFormUpdateContact(
          { firstname: (bookingInfo.bookData.contact.FirstName || ''), lastname: bookingInfo.bookData.contact.LastName || '', mobilenumber: bookingInfo.bookData.contact.MobileNumber || '', email: bookingInfo.bookData.contact.Email || '' }
        );
      } else {
        this.initFormUpdateContact(
          { firstname: '', lastname: '', mobilenumber: '', email: '' }
        );
      }
    }

    this.bookingRoom = bookingRoom;
    this.getPriceSummary(this.bookingRoom);

    //get coupons when user logged-in.
    this._state.subscribe([EVENT.LOGGED_IN], (value: boolean = false) => {
      if (value) {
        this.coupons = [];
        this.onLoadCoupons();
      }
    });
  }

  // fn on detect profile information
  onDetectFullProfileInfo = (): boolean => {
    return (!!this.profile.firstName && !!this.profile.lastName && !!this.profile.email && !!this.profile.phone);
  };

  // fn form init
  onFormInit = () => {
    this.contactForm = this._fb.group({
      'firstName': [, Validators.compose([
        Validators.required
      ])],
      'lastName': [, Validators.compose([
        Validators.required
      ])],
      'email': [, Validators.compose([
        Validators.required,
        Validators.pattern(CPATTERN.EMAIL_REGEX)
      ])],
      'phone': [, Validators.compose([
        Validators.required,
        Validators.pattern(CPATTERN.PHONE_REGEX)
      ])],
      'representer': [, Validators.compose([
        (this.isShowRepresenter ? Validators.required : null),
      ])]
    });

    this.firstName = this.contactForm.controls['firstName'];
    this.lastName = this.contactForm.controls['lastName'];
    this.email = this.contactForm.controls['email'];
    this.phone = this.contactForm.controls['phone'];
    this.representer = this.contactForm.controls['representer'];
  };

  initFormUpdateContact(contact: IContact) {
    this.contactForm.setValue({
      firstName: contact.firstname || '',
      lastName: contact.lastname || '',
      phone: contact.mobilenumber || '',
      email: contact.email || '',
      representer: this.representer.value || '',
    })
  }

  // fn on selected point successfully
  onSubmitPoint({ points = 0, isApply = true }) {
    this.bookingRoom.points = points;
    this.isApplyPoint = isApply;

    //check is applied coupon
    if (this.isApplyCoupon) {
      this.isApplyCoupon = false;
      this.bookingRoom.couponCode = '';
    }

    this._spinner.show('Đang cập nhật thông tin điểm...');
    this.getPriceSummary(this.bookingRoom);
  };

  // fn on submit coupon
  onSubmitCoupon(coupon: Coupon) {
    this.selectedCoupon = new Coupon(coupon);
    this.bookingRoom.couponCode = this.selectedCoupon.code;
    this.isApplyCoupon = !!coupon.code;

    //check is applied coupon
    if (this.isApplyPoint) {
      this.isApplyPoint = false;
      this.bookingRoom.points = 0;
    }

    this._spinner.show('Đang cập nhật thông tin mã khuyến mãi...');
    this.getPriceSummary(this.bookingRoom);
  }

  getPriceSummary(data: IBookingRoom) {
    this._hotelRepo.getPriceSummary({
      selectedValue: data.selectedValue,
      points: data.points,
      couponCode: data.couponCode
    })
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(this.catchError),
        finalize(() => { this._spinner.hide(); }),
      )
      .subscribe(
        (res: any) => {
          if (res instanceof Error) {
            this.handleErrors(new Error(res));
          } else {
            this.bookingHotel = new BookingHotel(res)

            //check is apply coupon, point have successed.
            this.isApplyCoupon = !!data.couponCode;
            this.isApplyPoint = !!data.points;
          }
        },
        // error
        (errs: any) => {
          this.handleErrors(errs);
        },
        // complete
        () => {
        }
      )
  }

  //fn handle error
  handleErrors(error: any) {
    if (error instanceof HttpErrorResponse) {
      this._toastr.error(`${error.message}`, '');
    }
    else if (error instanceof Error) {
      switch (error.code) {
        case TYPE_ERROR.ROOM_NOT_FOUND: {
          // this._router.navigate(['/hotel/search']);
          this._toastr.error(`${!!error.value ? error.value : 'Có lỗi xảy ra, Vui lòng kiểm tra lại'}`, '');
          break;
        }
        default:
          break;
      }
    }
    else {
      this._toastr.error(`Có lỗi xảy ra, Vui lòng kiểm tra lại`, '');
    }

    this._spinner.hide();
  }

  // fn open confirm back
  openConfirmBack = () => {
    this.confirmPopup.show();
  };

  // fn clean data
  onSubmitConfirmBack = ($event) => {
    if ($event) {
      this._storage.removeItem(CSTORAGE.ROOM_BOOKING_INFO);
      this._storage.setItem(CSTORAGE.ROOM_BOOKING, {
        couponCode: '',
        points: 0,
        selectedValue: this.bookingRoom.selectedValue
      });
      this._location.back();
    }

  };

  // fn go to payment
  onPayment = (data: any): void => {
    this._spinner.show('Xtrip đã tiếp nhận thông tin. Tiến trình đặt chỗ sẽ hoàn tất trong ít phút');

    this._hotelRepo.bookHotel(data)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(this.catchError),
        mergeMap((res: any) => {
          if (res.statusCode === 1) {
            return of(res); //success
          }
          return throwError('Error!');
        }),
        retry(2), // pending or failed
        finalize(() => { this._spinner.hide() }),
      )
      .subscribe(
        (res: any) => {
          this._storage.setItem(CSTORAGE.ROOM_BOOKING_INFO, this.bookingHotel);
          this._router.navigate(['/payment'], {
            queryParams: {
              'reservationCode': res.reservationCode,
              'module': 'hotel'
            }
          });
        },
        // error
        (errors) => {
          console.log(errors);
          this._toastr.error('Thanh toán thất bại. Vui lòng thử lại sau');
        },
        // success
        () => { }

      )
  }

  //fn book hotel
  onBookHotel() {
    const contact: any = {
      FirstName: this.firstName.value,
      LastName: this.lastName.value,
      MobileNumber: this.phone.value,
      Email: this.email.value
    }
    this.bookingHotel.bookData.representer = this.isShowRepresenter ? this.representer.value : '';
    this.bookingHotel.bookData.contact = contact;

    this.onPayment(this.bookingHotel);
  }

  //đặt phòng cho người khác
  onChangeRepresenter($event: boolean) {
    this.isShowRepresenter = $event;
    if (this.isShowRepresenter) {
      this.representer.setValidators([, Validators.compose([
        Validators.required,
      ])]);
    } else {
      this.representer.clearValidators();
      this.representer.setValue("");
    }
  }

  //sửa form contact
  onEditContact() {
    this.isEdit = true;
  }

  async onLoadCoupons() {
    try {
      const res: any = await this._couponRepo.getCoupons(null, this.offset, this.limit);
      this.coupons = (res.data.results || []).map((coupon: any) => new Coupon(coupon));
    }
    catch (errors) {
    }
    finally {

    }
  }

  applyPromo(type: TYPE_PROMO) {
    //save data user inputed.
    this.bookingHotel.bookData.representer = this.representer.value || '';
    this.bookingHotel.bookData.contact = {
      Email: this.email.value || '',
      FirstName: this.firstName.value || '',
      LastName: this.lastName.value || '',
      MobileNumber: this.phone.value || ''
    }
    this._storage.setItem(CSTORAGE.ROOM_BOOKING_INFO, this.bookingHotel);

    if (this._security.isAuthenticated()) {
      switch (type) {
        case TYPE_PROMO.COUPON: {
          this.couponPopup.show();
          break;
        }
        case TYPE_PROMO.POINT: {
          this.pointPopup.show();
          break;
        }
      }
    } else {
      this._router.navigate(['/authentication']);
      return;
    }
  }

  openCouponDetail() {
    this.couponDetailPopup.show();
  }

}
interface IBookingRoom {
  selectedValue: string;
  couponCode: string;
  points: number;
}

interface IContact {
  firstname: string;
  lastname: string;
  mobilenumber: string;
  email: string;
}