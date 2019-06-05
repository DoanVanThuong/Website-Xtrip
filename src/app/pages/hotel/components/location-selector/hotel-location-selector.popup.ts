import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CSTORAGE } from './../../../../app.constants';
import { StorageService, HotelRepo, HotelDestination } from '../../../../common';
import { PopupBase } from 'app/components/popup';

import * as _ from 'lodash';

@Component({
  selector: 'hotel-location-selector-popup',
  templateUrl: 'hotel-location-selector.popup.html',
  styleUrls: ['hotel-location-selector.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelLocationSelectorPopup extends PopupBase {

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  history: Array<HotelDestination> = [];
  sources: Array<HotelDestination> = [];

  sourcesFavorite: Array<HotelDestination> = [];
  isTyping: boolean = false;

  keyword: string = '';
  timeout: any;

  constructor(
              private _hotelRepo: HotelRepo,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.getHistory();
    this.getFavoriteLocation();
  }

  onReset() {
    this.keyword = '';
    this.sources = [];
    this.getHistory();
  };

  onShow(e: any) {
    this.onReset();
  }

  // select location
  onSelect = (location: any = {}, mode: string = 'history') => {

    this.keyword = '';
    this.hide();
    this.select.emit(location);

    // push in history
    if (mode == 'result') {
      if (!this.findExistingHistory(location.name)) {
        this.history.unshift(location);
        this._storage.setItem(CSTORAGE.HOTEL_LOCATION, _.take(this.history, 5));
        this.history = _.take(this.history, 5);
      }
    }
  };

  // find existing history
  findExistingHistory(name: string = '') {
    for (let index in this.history) {

      if (this.history[index].name === name) {
        return true;
      }
    }
    return false;
  }

  // result history
  getHistory() {
    let history = this._storage.getItem(CSTORAGE.HOTEL_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(history)) {
      if (history.length > 0) {
        this.history = _.take(history, 5);
      }
    }
  }

  // result on change
  onChange = (e: any) => {

    clearTimeout(this.timeout);

    this.isTyping = true;

    this.timeout = setTimeout(() => {
      if (e.length >= 1) {

        return this._hotelRepo
          .getDestinationHotel(e)
          .then(
            (res: any) => {
              this.isTyping = false;
              this.sources = res.data.map(loc => new HotelDestination(loc))
            },
            (errors: any) => {
              this.sources = [];
              this.isTyping = false;
            }
          );
      } else if (e.length == 0) {
        this.sources = [];
        this.isTyping = false;
      }
    }, 500);
  };

  // fn get favorite location
  getFavoriteLocation() {
    return this._hotelRepo
      .getFavourites()
      .then(
        (res: any) => {
          this.sourcesFavorite = res.data.map(loc => new HotelDestination(loc));
        },
        (errors: any) => {
          this.sourcesFavorite = [];
        }
      );
  }

  

}
