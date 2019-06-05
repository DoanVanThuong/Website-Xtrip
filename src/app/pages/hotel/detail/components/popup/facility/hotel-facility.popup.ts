import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
    selector: 'hotel-facility-popup',
    templateUrl: './hotel-facility.popup.html',
    styleUrls: ['./hotel-facility.popup.less'],
    encapsulation: ViewEncapsulation.None

})
export class HotelFalityPopupComponent extends PopupBase {
    @Input() data: any = [];

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
