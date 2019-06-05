import {AfterViewInit, Input, OnDestroy, OnInit} from '@angular/core';
import {CAPP, CSTORAGE} from './app.constants';
import {environment} from '../environments/environment';
import {UtilityHelper} from './common/helpers';
import { Subject } from 'rxjs/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AppPage implements OnInit, OnDestroy, AfterViewInit {

  @Input() class: string = '';

  CAPP = CAPP;
  CSTORAGE = CSTORAGE;
  utilityHelper: UtilityHelper = new UtilityHelper();

  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;

  offset: number = 0;
  limit: number = 10;
  itemsPerRow: number = 4;

  isProduction: boolean = environment.live;
  ngUnsubscribe: Subject<any> = new Subject();

  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(): void {
  }

  // fn get base url
  getBaseURL = (): string => {
    const protocol = this.isProduction ? '' : 'https:';
    return `${protocol}${environment.API_URL}`;
  };

  // fn scroll to top
  scrollTop = (element: string = '', speed: number = 300) => {
    if (!!element) {
      document.querySelector(element).scrollTop = 0;
    } else {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // fn scroll to bottom
  scrollBottom = (speed: number = 300) => {

    const body = document.querySelector('body');
    body.scrollTop = body.clientHeight;
  };

  // select text when focus
  onSelectInput = ($event) => {
    $event.target.select();
  };

  // set device mode
  setDeviceMode = (device: any) => {
    this.isMobile = device.isMobile();
    this.isDesktop = device.isDesktop();
    this.isTablet = device.isTablet();
  };

  // track by index
  trackByFn = (index: number, item: any): any => {
    return !!item.id ? item.id : (!!item.code ? item.code : index);
  };

  //fn catch error => Observable
  catchError(error: HttpErrorResponse): Observable<any> {
    return Observable.throw(error || 'Có lỗi xảy, Vui lòng kiểm tra lại !');
  }

  back() {
    window.history.back();
  }
}

export abstract class AppBase extends AppPage {
}
