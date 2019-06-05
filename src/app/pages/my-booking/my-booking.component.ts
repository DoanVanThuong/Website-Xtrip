import {Component, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../app.base';
import {DeviceService} from '../../common/services';

@Component({
  selector: 'app-my-booking',
  templateUrl: 'my-booking.component.html',
  styleUrls: ['my-booking.component.html'],
  encapsulation: ViewEncapsulation.None
})
export class MyBookingComponent extends AppBase {

  constructor(protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {

  }
}
