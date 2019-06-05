import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopupBase } from 'app/components/popup';
import { CouponRepo, Coupon, Spinner } from 'app/common';

@Component({
    selector: 'coupon-detail-item',
    templateUrl: './coupon-detail-item.popup.html',
    styleUrls: ['./coupon-detail-item.popup.less']
})
export class CouponDetailItemPopupComponent extends PopupBase {

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() code: string = null;
    @Input() isApply: boolean = false;

    data: any = null;

    isLoading: boolean = false;

    constructor(
        private _couponRepo: CouponRepo,
        private _spinner: Spinner) {
        super();
    }
    ngOnChanges() {
        if (!!this.code) {
            this.getDetailCoupon(this.code);
        }
    }

    ngOnInit(): void { }

    async getDetailCoupon(code: string) {
        this.isLoading = true;
        try {
            const data: any = await this._couponRepo.getCouponDetail(code);
            this.data = data.data || null;
        } catch (error) {

        } finally {
            this.isLoading = false;
        }
    }

    applyCoupon(coupon: Coupon) {
        if (!this.isApply) {
            this.hide();
            this.onChange.emit(coupon);
        } else {
            this.hide();
            this.onChange.emit(Object.assign({}, coupon, { code: '' }));
        }

    }
}
