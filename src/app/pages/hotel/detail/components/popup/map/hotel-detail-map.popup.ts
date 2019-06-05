import { Component, OnInit, Input } from '@angular/core';
import { PopupBase } from 'app/components/popup';

@Component({
    selector: 'hotel-detail-map',
    templateUrl: './hotel-detail-map.popup.html',
    styleUrls: ['./hotel-detail-map.popup.less']
})
export class HotelDetailMapPopupComponent extends PopupBase{
    @Input('') longitude?: any;
    @Input('') latitude?: any;
    @Input('') name?: any;
    
    @Input() icon: string = 'assets/images/hotel/position-maker.svg';
    @Input() places: IPlacePopular[] = [];

    mapStyles: any = {};
    isShowPlace: boolean = false;
    constructor(
    ) {
        super();
    }

    ngOnInit() {
    }
    
    onShowListPlace() {
        this.isShowPlace = !this.isShowPlace;
    }

    onMapClicked($event) {
        if(this.isShowPlace) {
            this.isShowPlace = false;
        } else  return;
    }

}

interface IPlacePopular {
    name: string;
    distance: string;
}
