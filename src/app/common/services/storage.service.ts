import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class StorageService {

  protected storage: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              protected _cookieService: CookieService) {

    if (isPlatformBrowser(this.platformId)) {
      if (typeof localStorage === 'object') {
        try {
          this.storage = localStorage;
        } catch (e) {
          this.fakeStorage();
        }
      } else {
        this.fakeStorage();
      }
    }
  }

  // fn fake storage
  protected fakeStorage() {
    console.log('Use fake localStorage for any browser that does not support it');

    this.storage = {};
    this.storage.getItem = (key) => {
      return this._cookieService.get(key);
    };
    this.storage.setItem = (key, data) => {
      return this._cookieService.put(key, data);
    };
    this.storage.removeItem = (key) => {
      return this._cookieService.remove(key);
    };
    this.storage.clear = () => {
      return this._cookieService.removeAll();
    };
  }

  // fn get item
  getItem = (key: string, isJson: boolean = true): any => {

    const keys = [
      ['{', '['],
      ['}', ']']
    ];

    if (!this.storage) {
      return null;
    }

    const data = this.storage.getItem(key);

    if (!!data) {
      isJson = keys[0].indexOf(data[0]) !== -1 || keys[1].indexOf(data[data.length - 1]) !== -1;
    }

    if (isJson) {
      return this.string2Json(this.storage.getItem(key));
    }
    return this.storage.getItem(key);
  };

  // fn set item
  setItem = (key: string, data: any, isJson: boolean = true): void => {

    if (!this.storage) {
      return null;
    }

    isJson = typeof data === 'object';

    if (isJson) {
      return this.storage.setItem(key, this.json2String(data));
    }

    return this.storage.setItem(key, data);
  };

  // fn remove item
  removeItem = (key: string = ''): void => {
    if (!this.storage) {
      return null;
    }

    return this.storage.removeItem(key);
  };

  // fn remove items by list
  removeItems = (keys: string[] = []) => {
    for (let index in keys) {
      this.removeItem(keys[index]);
    }
  };

  // fn clear
  clear = (): void => {
    if (!this.storage) {
      return null;
    }

    return this.storage.clear();
  };

  // fn json to string
  json2String = (object: any = Object()): string => {
    return JSON.stringify(object);
  };

  // fn string to json
  string2Json = (string: any = ''): Object => {
    return JSON.parse(string);
  };
}
