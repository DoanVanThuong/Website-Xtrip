import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopupBase } from 'app/components/popup';
import { CAPP } from 'app/app.constants';

@Component({
    selector: 'hotel-apply-point-popup',
    templateUrl: './hotel-apply-point.popup.html',
    styleUrls: ['./hotel-apply-point.popup.less']
})
export class HotelApplyPointPopupComponent extends PopupBase {

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() points: number = 0;    //điểm của user hiện có.
    @Input() totalPrice: number = 0; //giá ban đầu.
    @Input() isApplied: boolean = false; //đã được applied 

    maxPriceToUsing: number = 0;   //tiền giảm tối đa được sử dụng.
    price: number = 0;          //tiền sau khi giảm

    maxPointToUsing: number = 0;  //điểm tối đa được sử dụng.
    pointAvailable: number = 0; //điểm được phép dùng

    isApply: boolean;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.maxPriceToUsing = Number(this.points) * CAPP.UNIT_POINT;
    }

    ngOnChanges() {
        this.isApply = this.isApplied;

        this.price = this.totalPrice;
        this.maxPointToUsing = Math.ceil(this.totalPrice / CAPP.UNIT_POINT);

        //nếu điểm user hiện có lớn hơn điểm dùng tối đa
        if (this.points > 0 && this.points > this.maxPointToUsing) {
            this.pointAvailable = this.maxPointToUsing;
            this.maxPriceToUsing = this.pointAvailable * CAPP.UNIT_POINT;
        } else {
            this.pointAvailable = this.points;
        }
    }

    confirm() {
        this.onChange.emit({ points: this.isApply ? this.pointAvailable : 0, isApply: this.isApply });
        this.hide();
    }

    onChangeApplyPoint(value: boolean) {
        this.isApply = value;
        this.calculartorPrice();
    }

    onShowPointPopup() {
        this.isApply = this.isApplied;
        this.calculartorPrice();
    }

    calculartorPrice() {
        if (this.isApply) {
            this.price = (this.totalPrice - this.maxPriceToUsing > 0 ? this.totalPrice - this.maxPriceToUsing : 0);
        } else {
            this.price = this.totalPrice;
        }
    }
}
