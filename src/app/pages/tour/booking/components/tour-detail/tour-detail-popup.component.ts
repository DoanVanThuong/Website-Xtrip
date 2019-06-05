import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PopupBase } from '../../../../../components/popup';
import { Tour, TourPackage } from '../../../../../common';

@Component({
    selector: 'tour-detail-popup',
    templateUrl: './tour-info-popup.component.html',
    styleUrls: ['./tour-detail-popup.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class TourDetailPopupComponent extends PopupBase {
    @Input() journey: any = null;
    @Input() tour: Tour = new Tour();
    @Input() package: TourPackage = null;
    tabs: any[] = [
        { id: 1, name: 'Lịch trình' },
        { id: 2, name: 'Phương tiện & Khách sạn' },
        { id: 3, name: 'Chính sách' },
        { id: 4, name: 'Điều khoản' },
    ]
    selectedTab: any = null;

    constructor() {
        super();
        this.selectedTab = this.tabs[0];

    }

    ngOnInit() {
        if (!!this.journey) {
        }
    }

    onSelectTab(tab: any) {
        this.selectedTab = tab;
    }
}
