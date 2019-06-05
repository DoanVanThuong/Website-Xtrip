import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AppBase } from 'app/app.base';
import {DeviceService} from '../../../../../common/services';

@Component({
    selector: 'product-perbooking-item',
    templateUrl: './product-perbooking-item.component.html',
    styleUrls: ['./product-perbooking-item.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ProductPerBookingItemComponent extends AppBase {
    @Input() item: any;
    @Input() options: any[] = [];
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    selectedOPtion: any;

    iconAdd: string = 'assets/images/icon/icon-plus-orange-white.svg';
    iconMinus: string = 'assets/images/icon/icon-minus-orange-white.svg';

    constructor(private _device: DeviceService) {
        super();
        this.setDeviceMode(this._device);
    }

    ngOnInit(): void { }

    ngOnChanges() {
        if (!!this.options.length && !!this.item && this.item.inputType === 1) {
            this.selectedOPtion = this.options[0].items[0];
        }
    }

    //fn on change select option
    onChangePerbooking(data: any) {
        this.selectedOPtion = data;
        this.onChange.emit(this.selectedOPtion);
    }

    //fn on change number option
    onOptionChange(data: any, option: any) {
        this.onChange.emit({ count: data, data: option });
    }
}
