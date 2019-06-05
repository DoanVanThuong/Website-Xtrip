import { Component, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { PopupBase } from '../../../../../../components/popup';
import { Tour, BookingTour, TourRepo } from '../../../../../../common';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'passenger-popup',
    templateUrl: './tour-passenger.popup.html',
    styleUrls: ['./tour-passenger.popup.less'],
    encapsulation: ViewEncapsulation.None
})
export class TourPassengerPopupComponent extends PopupBase {

    @Input() tour: Tour = new Tour();
    @Input() data: BookingTour = new BookingTour();
    @Input() groupAge: any[] = [];
    @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() onclose: EventEmitter<any> = new EventEmitter<any>();

    totalPrice: number = 0;
    totalPassenger: number = 1;
    bookingTour: BookingTour;

    constructor(private _tourRepo: TourRepo,
        private _toastr: ToastrService) {
        super();
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
        if (!!this.tour.departDate) {
            this.bookingTour = new BookingTour(this.data);
            this.totalPassenger = _.sum([this.bookingTour.adults, this.bookingTour.children, this.bookingTour.infants]);
            this.getPriceSummary();
        }
    }

    confim() {
        this.onConfirm.emit(this.bookingTour);
        this.hide();
    }

    close() {
        this.hide();
    }

    //fn detect people change
    onPeopleChanges(data: number, type: string) {
        switch (type.toLowerCase()) {
            case 'adult':
                this.bookingTour.adults = data;
                break;
            case 'children':
                this.bookingTour.children = data;
                break;
            case 'infant':
                this.bookingTour.infants = data;
                break;
            default:
                break;
        }

        if (this.bookingTour.adults + this.bookingTour.children > this.tour.available) {
            this._toastr.error(`Rất tiếc không còn đủ chỗ trống phù hợp với yêu cầu của bạn`, 'Lỗi', { positionClass: 'toast-bottom', timeOut: 3000 });
            this.bookingTour.adults = 1;
            this.bookingTour.children = 0;
            this.bookingTour.infants = 0;
            this.totalPassenger = _.sum([this.bookingTour.adults, this.bookingTour.children, this.bookingTour.infants]);
        }
        this.totalPassenger = _.sum([this.bookingTour.adults, this.bookingTour.children, this.bookingTour.infants]);
        this.getPriceSummary();

    }

    // fn get price summary
    getPriceSummary = async (): Promise<any> => {
        this.bookingTour.departDate = this.tour.departDate;

        try {
            const res: any = await this._tourRepo.getPriceSummary(this.bookingTour);
            this.totalPrice = 0;
            res.data.totalItems.map(item => {
                this.totalPrice += item.price;
            });
        }
        catch (errors) {
        }
    };
}


