import {Injectable} from "@angular/core";
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable()
export class DeviceHelper {

  public device: any;

  constructor(protected _device: DeviceDetectorService) {
    this.device = _device;
  }

  // fn is mobile
  isMobile = (): boolean => {
    return this._device.isMobile();
  };

  // fn is tablet
  isTablet = (): boolean => {
    return this._device.isTablet();
    // return this.isMobile() && (this.device.tablet() !== 'null' && this.device.tablet() !== null);
  }

  // fn is desktop
  isDesktop = (): boolean => {
    return this._device.isDesktop();
    // return (!this.isMobile() && !this.isTablet());
  }
}
