import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PopupBase } from 'app/components/popup';
import { Coupon } from 'app/common';
import { CouponDetailItemPopupComponent } from '../coupon-detail-item-popup/coupon-detail-item.popup';

@Component({
    selector: 'hotel-apply-coupon-popup',
    templateUrl: './hotel-apply-coupon.popup.html',
    styleUrls: ['./hotel-apply-coupon.popup.less']
})
export class HotelApplyCouponPopupComponent extends PopupBase {
    @Input() data: Coupon[] = []
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(CouponDetailItemPopupComponent) detailCouponPopup: CouponDetailItemPopupComponent;

    selectedCouponCode: string = null;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    ngOnChanges() {

    }

    viewDetail(coupon: Coupon) {
        this.selectedCouponCode = coupon.code;
        this.detailCouponPopup.show();
    }

    applyCoupon(coupon: Coupon) {
        this.submit(coupon)
    }

    onApplyCoupon(coupon: Coupon) {
        this.submit(coupon)
    }

    submit(coupon: Coupon) {
        this.onChange.emit(coupon);
        this.hide();
    }

}
