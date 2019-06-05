import { Component, Input} from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
    selector: 'hotel-hot-place-popup',
    templateUrl: './hotel-hot-place.popup.html',
    styleUrls: ['./hotel-hot-place.popup.less']
})
export class HotelHotPlacePopupComponent extends PopupBase {
    
    @Input() data: any = [];
    constructor() { 
        super();
    }

    ngOnInit(): void { }
}
