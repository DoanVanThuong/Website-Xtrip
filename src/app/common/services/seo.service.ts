import {Inject, Injectable} from '@angular/core';
import {DOCUMENT, Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {CAPP} from '../../app.constants';
import {environment} from '../../../environments/environment';
import {DomAdapter} from '@angular/platform-browser/src/dom/dom_adapter';

@Injectable()
export class SeoService {

  constructor(private _meta: Meta,
              private _title: Title,
              @Inject(DOCUMENT) private _document: any) {
  }

  // fn set title
  setTitle = (title: string = ''): SeoService => {
    this._title.setTitle(title);
    return this;
  };

  // fn update tag
  updateTag = (tag: MetaDefinition = {}): SeoService => {
    this._meta.updateTag(tag);
    return this;
  };

  // fn update meta tags
  updateTags = (tags: MetaDefinition[] = []): SeoService => {
    for (let index in tags) {
      this.updateTag(tags[index]);
    }

    return this;
  };

  // fn set deep link
  setDeepLink = (link: string = '', params: any = {}): SeoService => {

    if (!!Object.keys(params).length) {
      link += '?';
      for (let key in params) {
        link += `${key}=${params[key]}&`;
      }

      link = link.substr(0, link.length - 1);
    }

    return this.updateTags([
      // for android
      {property: 'al:android:url', content: `${environment.ANDROID_URL}${link}`},
      {property: 'al:android:app_name', content: CAPP.PROJECT_NAME},
      {property: 'al:android:package', content: environment.ANDROID_PACKAGE},
      // for ios
      {property: 'al:ios:url', content: `${environment.IOS_URL}${link}`},
      {property: 'al:ios:app_store_id', content: environment.IOS_STORE_ID},
      {property: 'al:ios:app_name', content: CAPP.PROJECT_NAME},
    ]);
  };
}
