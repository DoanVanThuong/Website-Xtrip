import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isPlatformBrowser} from '@angular/common';
import {StorageService} from './storage.service';
import {CSTORAGE} from '../../app.constants';
import {Md5} from 'ts-md5';

@Injectable()
export class DeviceService {

  deviceServer: any = null;
  deviceInfo: any = {};
  device: any = null;
  deviceID: string = null;

  constructor(protected _device: DeviceDetectorService,
              protected _storage: StorageService,
              @Optional() @Inject('device') private deviceDetector: any,
              @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.device = this._device;
      this.deviceInfo = this._device.getDeviceInfo();

      this.getDeviceID();
    } else {
      this.deviceServer = this.deviceDetector;
    }
  }

  // fn get device id
  getDeviceID = () => {
    this.deviceID = this._storage.getItem(CSTORAGE.DEVICE, false) || null;

    if (!this.deviceID) {

      this.deviceID = Md5.hashStr([
        this._device.isMobile().toString(),
        this._device.isTablet().toString(),
        this._device.isDesktop().toString(),
        this.deviceInfo.browser,
        this.deviceInfo.os,
        this.deviceInfo.device,
        this.deviceInfo.userAgent,
        this.deviceInfo.os_version,
      ].join(':')).toString();
    }

    return this.deviceID;
  };

  // fn is mobile
  isMobile = (): boolean => {
    if (!!this.deviceServer) {
      return !this.isTablet() || !this.isDesktop();
    } else if (!!this.device) {
      return this.device.isMobile();
    }

    return false;
  };

  // fn is tablet
  isTablet(): boolean {
    // mode tablet for desktop
    /*if (!!this.deviceServer) {
      return this.deviceServer.device.type.toLowerCase() === 'tablet';
    } else {
      return this._device.isTablet();
    }*/

    return this.isDesktop();
  }

  // fn is desktop
  isDesktop = (): boolean => {
    if (!!this.deviceServer) {
      return this.deviceServer.device.type.toLowerCase() === 'desktop' || this.deviceServer.device.type.toLowerCase() === 'tablet';
    } else if (!!this.device) {
      return this.device.isDesktop() || this.device.isTablet();
    }

    return false;
  };

  // fn is android
  isAndroid = (): boolean => {

    return (this.isMobile() || this.isTablet()) && this._device.getDeviceInfo().os.toLowerCase() === 'android';
  };

  // fn is ios
  isIOs = (): boolean => {
    return (this.isMobile() || this.isTablet()) && this._device.getDeviceInfo().os.toLowerCase() === 'ios';
  };
}