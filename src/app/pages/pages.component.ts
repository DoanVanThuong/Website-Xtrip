import {Component} from '@angular/core';
import {AppPage} from "../app.base";
import {DeviceService} from "../common/services";
import {GlobalState} from "../global.state";

@Component({
  selector: '',
  template: `
    <div class="page">
      <router-outlet></router-outlet>
    </div>
  `
})
export class Pages extends AppPage {

  step: number = 0;

  constructor(private _device: DeviceService,
              private _state: GlobalState) {
    super();

    this.setDeviceMode(this._device);
  }

  ngOnInit(): void {
    this._state.subscribe('booking:mode', (step: number) => {
      this.step = step;
    });
  }
}
