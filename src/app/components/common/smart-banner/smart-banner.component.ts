import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../app.base';
import {DeviceService, StorageService} from '../../../common/services';
import * as moment from 'moment';
import {Meta} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CAPP, CSTORAGE} from '../../../app.constants';

declare var window: any;


const smartBannerOptions: any = {
  daysHidden: 15,
  daysReminder: 90,
  title: 'Xtrip.vn',
  author: 'Công ty cổ phần du lịch Xtrip',
  appStoreLanguage: 'us',
  button: '',
  store: {
    ios: '',
    android: '',
    windows: ''
  },
  price: {
    ios: '', // default is free
    android: '', // default is free
    windows: '' // default is free
  },
  onClose: null,
  onInstall: null
};

const BANNER_SETTING: string = 'xtrip:banner.settings';

@Component({
  selector: 'smart-app-banner',
  templateUrl: './smart-banner.component.html',
  styleUrls: ['./smart-banner.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('smartAnimated', [
      state('show', style({
        paddingTop: '24%',
      })),
      state('hidden', style({
        paddingTop: '0'
      })),
      transition('show <=> hidden', [
        animate('0.5s')
      ])
    ])
  ]
})
export class SmartBannerComponent extends AppBase {

  @Input('options') options: any = smartBannerOptions;

  isShow: boolean = false;
  settings: any = {};
  url: string = '';
  type: string = '';
  appId: string = '';

  constructor(private _storage: StorageService,
              private _meta: Meta,
              protected _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    this.settings = this._storage.getItem(CSTORAGE.BANNER_SETTING);

    this.getType();
    // this.getAppId();
    this.getUrl();
  }

  ngOnChanges() {
    this.options = Object.assign(smartBannerOptions, this.options);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  // fn get type
  getType = (): void => {
    this.type = this._device.deviceInfo.os.toLowerCase();

    /*if (this.device.isIOs()) {
      this.type = 'ios';
    }
    if (this.device.isAndroid()) {
      this.type = 'android';
    }*/
  };

  // fn get app id
  getAppId = (): void => {
    const meta = this._meta.getTag('name=google-play-app');

    if (!meta) {
      return;
    }

    // fn get app id
    const parsedMetaContent = /app-id=([^\s,]+)/.exec(meta.content);
    if (parsedMetaContent) {
      this.appId = parsedMetaContent[1];
    } else {
      return;
    }
  };

  // fn get url
  getUrl = (): void => {

    switch (this._device.deviceInfo.os.toLowerCase()) {
      case 'android': {
        this.url = `https://play.google.com/store/apps/details?id=${CAPP.ANDROID_APP_ID}`;
        break;
      }
      case 'ios': {
        this.url = `https://itunes.apple.com/${this.options.appStoreLanguage}/app/id${CAPP.IOS_APP_ID}`;
        break;
      }
    }
  };

  // fn on show banner
  onShow = (): boolean => {

    if (!this.utilityHelper.isNullOrUndefined(this.settings)) {

      const isHidden = !this.utilityHelper.isNullOrUndefined(this.settings.closedAt) && moment().diff(moment(this.settings.closedAt), 'days', true) < 0;
      const isReminder = !this.utilityHelper.isNullOrUndefined(this.settings.reminderAt) && moment().diff(moment(this.settings.reminderAt), 'days', true) < 0;

      return !isHidden && !isReminder && !!this.type && this._device.isMobile();
    }
    return this._device.isMobile();

  };

  // fn on install application
  onInstall = (): void => {
    this.settings = {
      reminderAt: moment().add(Number(this.options.daysReminder) || 90, 'days').toISOString()
    };

    this.saveSettings(this.settings);

    window.location.href = this.url;

    if (typeof this.options.onInstall === 'function') {
      this.options.onInstall();
    }
  };

  // fn on hide banner
  onClose = (): void => {

    this.settings = {
      closedAt: moment().add(Number(this.options.daysHidden) || 15, 'days').toISOString()
    };

    this.saveSettings(this.settings);

    if (this.options.onClose instanceof Function) {
      this.options.onClose();
    }
  };

  // fn save settings
  private saveSettings = (settings: any = {}) => {
    this._storage.setItem(CSTORAGE.BANNER_SETTING, settings)
    ;
  };
}
