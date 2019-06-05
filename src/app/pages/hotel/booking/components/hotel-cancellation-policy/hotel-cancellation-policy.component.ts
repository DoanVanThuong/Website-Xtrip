import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Room, StorageService, DeviceService } from '../../../../../common';
import { CSTORAGE } from '../../../../../app.constants';
import { Router } from '@angular/router';
import { AppBase } from '../../../../../app.base';

@Component({
  selector: 'hotel-cancellation-policy',
  templateUrl: 'hotel-cancellation-policy.html',
  styleUrls: ['hotel-cancellation-policy.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelCancellationPolicy extends AppBase {

  @Input() room: Room = new Room();
  @Input() data: any = null;

  constructor(private _storage: StorageService,
    private _device: DeviceService,
    private router: Router) {
    super();
    this.setDeviceMode(this._device);

  }


  ngOnInit() {

  }
}
