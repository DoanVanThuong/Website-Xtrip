import { Component, Input } from '@angular/core';
import { AppBase } from 'app/app.base';

@Component({
    selector: 'hotel-checkin-checkout',
    templateUrl: './hotel-in-out.component.html',
    styleUrls: ['./hotel-in-out.component.less']
})
export class HotelCheckInCheckOutInfoComponent extends AppBase {
    @Input() checkIn: any = null;
    @Input() checkOut: any = null;

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
