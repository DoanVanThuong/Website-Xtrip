import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../app.base';
import {DeviceService} from '../../common/services';
import {TourPackage} from '../../common/entities';

@Component({
  selector: 'tour-transport',
  templateUrl: './tour-transport.component.html',
  styleUrls: ['./tour-transport.component.less'],
})
export class TourTransportComponent extends AppBase {
  @Input('data') package: TourPackage = new TourPackage();


  constructor(private _device: DeviceService) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnChanges() {
    
  }

  ngOnInit(): void {
  }
}
