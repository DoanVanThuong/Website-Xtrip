import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { AppBase } from 'app/app.base';
import { Product } from 'app/common';
import { FullScreenMap } from 'app/components/popup';

@Component({
    selector: 'product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ProductInfoDesktopComponent extends AppBase {
    @ViewChild(FullScreenMap) mapviewPopup: FullScreenMap;

    @Input() data: Product = new Product();

    constructor() {
        super();
    }

    ngOnInit(): void { }

    //fn return time
    returnDuration(days: number = 0, hours: number = 0, minutes: number = 0) {
        if (days > 0) {
            return `${days} ngày`;
        }
        else {
            if (hours > 0) {
                if (minutes > 0) {
                    return `${hours} giờ ${minutes} phút`;
                }
                else {
                    return `${hours} giờ`;
                }
            }
            else return `${minutes} phút`;
        }
    }

    //fn view map
    viewMap() {
        this.mapviewPopup.show()

    }
}
