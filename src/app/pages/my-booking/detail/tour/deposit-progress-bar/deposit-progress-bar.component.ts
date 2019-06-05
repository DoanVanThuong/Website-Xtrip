import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AppBase } from 'app/app.base';
import { DeviceService } from '../../../../../common/services';
import { BOOKING_STATUS, PAYMENT_METHOD } from 'app/app.constants';

@Component({
    selector: 'app-deposit-progress-bar',
    templateUrl: './deposit-progress-bar.component.html',
    styleUrls: ['./deposit-progress-bar.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DepositProgressBarComponent extends AppBase {

    @Input() data: any = null;
    @Input() icon ?: boolean = false;

    STATUS: any = BOOKING_STATUS;
    METHOD: any = PAYMENT_METHOD;

    constructor(
        protected _device: DeviceService
    ) { super(); this.setDeviceMode(_device); }

}
