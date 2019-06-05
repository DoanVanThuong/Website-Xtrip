import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopupBase } from '../../popup.base';

@Component({
    selector: 'error-payment-popup',
    templateUrl: './error-payment.component.html',
    styleUrls: ['./error-payment.less']
})
export class ErrorPopupComponent extends PopupBase {

    @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
        super()
    }

    ngOnInit() { }

    //fn emit try payment
    tryPayment() {
        this.confirm.emit(true);
    }
}
