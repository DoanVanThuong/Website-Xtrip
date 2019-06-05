import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PopupBase } from '../popup.base';
import { DeviceService } from 'app/common';

@Component({
  selector: 'full-screen-map-popup',
  templateUrl: './full-screen-map.popup.html',
  styleUrls: ['./full-screen-map.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class FullScreenMap extends PopupBase {

  @Input('') longitude?: any;
  @Input('') latitude?: any;
  @Input('') name?: any;
  @Input() headerVersion: number = 1;
  @Input() icon: string = 'assets/images/hotel/position-maker.svg';

  mapStyles: any = {};

  constructor(
    private _device: DeviceService
  ) {
    super();
    this.setDeviceMode(this._device);
  }

  ngOnInit() {
  }

}
