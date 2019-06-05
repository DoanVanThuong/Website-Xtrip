import {Component} from '@angular/core';
import {AppBase} from '../../../app.base';
import {GlobalState} from '../../../global.state';
import {DeviceService} from '../../../common/services';

@Component({
  selector: 'app-payment-index',
  template: `
    <app-payment-index-mobile *ngIf="isMobile"></app-payment-index-mobile>
    <app-payment-index-desktop *ngIf="isDesktop"></app-payment-index-desktop>
  `
})
export class PaymentIndexComponent extends AppBase {

  isValidUrl: boolean = false;

  constructor(private _state: GlobalState,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

    this._state.subscribe('valid-url', (value: any) => {
      this.isValidUrl = value;
    });
  }

  ngAfterViewInit() {

  }
}
