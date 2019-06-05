import { Component, OnInit, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
    selector: 'hotel-description-popup',
    templateUrl: './hotel-detail-description.popup.html',
})
export class HotelDescriptionPopupComponent extends PopupBase {

    @Input() data: any = '';
    
    constructor() { 
        super();
    }

    ngOnInit(): void { }
}
