import {Component} from '@angular/core';
import {AppPage} from "../../app.base";
import {DeviceService} from "../../common/services";
import {GlobalState} from "../../global.state";

@Component({
  selector: '',
  templateUrl: './xtrip.component.html'
})
export class Xtrip extends AppPage {

  step: number = 0;

  constructor(private _device: DeviceService,
              private _state: GlobalState) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {

  }
}
