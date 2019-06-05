import {Component, Input, ViewEncapsulation, ViewChild, Output, EventEmitter, forwardRef} from '@angular/core';
import {ApplyCouponPopup} from '../../../components/';
import {PointSelectorPopup} from '../../../components';
import {Router} from '@angular/router';
import {StorageService, Security} from '../../../common';
import {AppBase} from '../../../app.base';
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'booking-optional',
  templateUrl: './booking-optional.component.html',
  styleUrls: ['./booking-optional.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class BookingOptionalComponent extends AppBase {

  @ViewChild(forwardRef(() => ApplyCouponPopup)) couponPopup: ApplyCouponPopup;
  @ViewChild(forwardRef(() => PointSelectorPopup)) pointPopup: PointSelectorPopup;

  @Input() error: any = {};
  @Input() couponCode: string = '';
  @Input() selectedPoint: number = 0;

  @Output() submitCoupon: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitPoint: EventEmitter<any> = new EventEmitter<any>();

  isLoggedIn = false;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _storage: StorageService,
              private _security: Security) {
    super();
  }

  ngOnInit() {
    this.isLoggedIn = this._security.isAuthenticated();

  }

  ngOnChanges() {
  }

  //open "apply-coupon popup"
  openCouponPopup = (code: string = ''): void => {
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

  //received coupon code from "apply-coupon popup"
  onSubmitCoupon(event: any) {
    this.submitCoupon.emit(event);
  }

  //clear coupon code
  clearCoupon = () => {
    this.couponCode = '';
    this.submitCoupon.emit(this.couponCode);
  };


  ///***********************Point*********************
  //open "point-selection" popup
  openSelectRewardPoint() {
    if (this.isLoggedIn) {
      this.pointPopup.selectedPoint = this.selectedPoint;
      this.pointPopup.show({
        backdrop: 'static',
        ignoreBackdropClick: true
      });
    }
    else {
      // let url = this._router.url;
      this._router.navigate(['/authentication']);
    }

  }

  //received selected point from popup "point-selection"
  onSubmitPoint = (event: any): void => {
    this.selectedPoint = event;
    this.submitPoint.emit(event);
  };

}
