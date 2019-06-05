import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppBase} from '../../../../../app.base';
import {BOOKING_STATUS} from '../../../../../app.constants';
import {DeviceService} from '../../../../../common/services';
import {ChangePaymentMethodPopup} from '../../../components/method-change-payment-popup/method-change-payment.popup';

@Component({
  selector: 'change-payment-method',
  templateUrl: './change-payment-method.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangePaymentMethod extends AppBase {

  @ViewChild(ChangePaymentMethodPopup) methodPopup: ChangePaymentMethodPopup;

  @Input() status: number = null;
  @Input() module: string = '';
  @Input() code: string = '';
  @Input() data: any = null;

  @Output() submitPopup ?: EventEmitter<any> = new EventEmitter<any>();

  STATUS: any = BOOKING_STATUS;

  constructor(private _router: Router,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  onOpenChangePaymentMethod = (code: string): void => {
    this.methodPopup.show();
  };
}
