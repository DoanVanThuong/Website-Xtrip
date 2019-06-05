import {Component, ViewEncapsulation, Output, EventEmitter, Input, ViewChild, forwardRef} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService, Security, DeviceService} from '../../../common';
import {AppBase} from '../../../app.base';
import {GlobalState} from '../../../global.state';
import {CAPP, EVENT} from '../../../app.constants';
import {SignInPopup} from '../../popup';
import {ApplyCouponPopup, PointSelectorPopup} from '../..';

const SERVICE: any = {
  COUPON: 'coupon',
  POINT: 'point',
};

@Component({
  selector: 'booking-optional-box',
  templateUrl: './booking-optional-box.component.html',
  styleUrls: ['./booking-optional-box.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingOptionalBoxComponent extends AppBase {

  @ViewChild(SignInPopup) signInPopup: SignInPopup;
  @ViewChild(forwardRef(() => ApplyCouponPopup)) couponPopup: ApplyCouponPopup;
  @ViewChild(forwardRef(() => PointSelectorPopup)) pointPopup: PointSelectorPopup;

  @Input('class') class: string = '';
  @Input('coupon') couponCode: string = '';
  @Input('points') selectedPoint: number = 0;
  @Input() error: any = {};

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() applyCoupon: EventEmitter<any> = new EventEmitter<any>();
  @Output() applyPoint: EventEmitter<any> = new EventEmitter<any>();

  isAppliedCouponCode: boolean = false;
  isAppliedPoint: boolean = false;

  min: number = 0;
  max: number = 0;
  sliderConfig = {
    connect: [true, false],
    padding: [0, 0],
    step: 1
  };

  selectedOptional: string = null;
  isLoggedIn: boolean = false;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _storage: StorageService,
              private _security: Security,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    if (this._security.isAuthenticated()) {
      this.isLoggedIn = this._security.isAuthenticated();
      this.max = this._security.getCurrentUser().points;
    }

    this._state.subscribe(EVENT.LOGGED_IN, (value) => {
      if (this._security.isAuthenticated()) {
        this.isLoggedIn = this._security.isAuthenticated();
        this.max = this._security.getCurrentUser().points;
      }
    });

    this._state.subscribe(EVENT.OPTIONAL_CHANGED, (optional: {
      point: number,
      couponCode: string
    } = {point: 0, couponCode: ''}) => {
      this.selectedPoint = optional.point || 0;
      this.couponCode = optional.couponCode || '';

      this.isAppliedPoint = !!optional.point;
      this.isAppliedCouponCode = !this.utilityHelper.isNullOrUndefined(optional.couponCode);
    });
  }

  ngOnChanges() {

    if (!this.utilityHelper.isNullOrUndefined(this.couponCode) && !!this.couponCode) {
      this.selectedOptional = SERVICE.COUPON;
      this.isAppliedCouponCode = true;
    } else if (!this.utilityHelper.isNullOrUndefined(this.selectedPoint) && !!this.selectedPoint) {
      this.selectedOptional = SERVICE.POINT;
      this.isAppliedPoint = true;
    }
  }

  // convert point to Money
  convertPoint2Money = (point: number = 0) => {
    return point * CAPP.UNIT_POINT;
  };

  // fn on apply coupon
  onApplyCoupon = ($event: string = '') => {
    // this.selectedPoint = 0;
    this.couponCode = $event;
    this.applyCoupon.emit(this.couponCode);
  };

  // fn destroy coupon
  onUnsetCoupon = () => {
    this.isAppliedCouponCode = false;
    this.couponCode = '';
    this.applyCoupon.emit(this.couponCode.trim());
  };

  // fn on set point
  onApplyPoint = ($event: number = 0) => {
    // this.couponCode = '';
    this.selectedPoint = $event;
    this.applyPoint.emit(this.selectedPoint);
  };

  // fn on slider change
  onPointChange = ($event: number = 0) => {
    this.selectedPoint = $event;
  };

  // fn on selec optional
  onSelectOptional = (type: string = '') => {

    // fn on detect logged in
    if (!this.isLoggedIn) {
      this.onDetectProfile();
      return;
    }

    if (this.selectedOptional === type) {
      // selected before

      switch (this.selectedOptional) {
        case SERVICE.COUPON: {
          this.couponCode = '';
          this.onApplyCoupon();
          this.isAppliedCouponCode = false;

          break;
        }
        case SERVICE.POINT: {
          this.selectedPoint = 0;
          this.onApplyPoint();
          this.isAppliedPoint = false;

          break;
        }
      }

      this.selectedOptional = null;
    } else {

      switch (type) {
        case SERVICE.COUPON: {
          if (this.isMobile) {
            this.onOpenCouponPopup();
          } else if (!!this.selectedPoint) {
            this.selectedPoint = 0;
            this.onApplyPoint();
          }

          this.isAppliedCouponCode = !!this.couponCode;
          break;
        }
        case SERVICE.POINT: {
          if (this.isMobile) {
            this.onOpenPointPopup();
          } else if (!!this.couponCode) {
            this.couponCode = '';
            this.onApplyCoupon();
          }
          this.isAppliedPoint = !!this.selectedPoint;

          break;
        }
      }

      if (this.isDesktop) {
        this.selectedOptional = type;
      }
    }

  };

  // fn on submit
  onSubmit = () => {

    this.submit.emit({
      coupon: this.selectedOptional === 'coupon' ? this.couponCode : '',
      point: this.selectedOptional === 'point' ? this.selectedPoint : 0
    });
  };

  // fn on detect logged in profile
  onDetectProfile = () => {

    if (this.isMobile) {
      this._router.navigate(['/authentication']);
    } else {
      this.signInPopup.show();
    }
  };

  // fn on open coupon popup
  onOpenCouponPopup = (code: string = ''): void => {
    if (this.isLoggedIn) {

      this.couponPopup.couponCode = '';
      this.couponPopup.errorMessage = '';

      this.couponPopup.show({
        backdrop: 'static',
        ignoreBackdropClick: true
      });
    } else {
      this._router.navigate(['/authentication']);
    }
  };

  // fn on open reward point popup
  onOpenPointPopup = () => {
    if (this.isLoggedIn) {
      this.pointPopup.selectedPoint = this.selectedPoint;

      this.pointPopup.show({
        backdrop: 'static',
        ignoreBackdropClick: true
      });
    } else {
      // let url = this._router.url;
      this._router.navigate(['/authentication']);
    }

  };
}
