import { Component, ElementRef, EventEmitter, Output, OnChanges, OnInit, OnDestroy, Input } from '@angular/core';
import { PlaneTicketRepo, StorageService } from '../../../common/index';
import { CSTORAGE } from '../../../app.constants';
import { PopupBase } from '../../popup/popup.base';

@Component({
  selector: 'flight-location-selector-popup',
  templateUrl: './flight-location-selector.popup.html'
})

export class FlightLocationSelectorPopup extends PopupBase {

  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();
  @Input('type') type;

  history: Array<any> = [];
  sources: Array<any> = [];
  isTyping: boolean = false;

  keyword: string = '';
  timeout: any;
  reset: any = null;

  sourcesFavorite: Array<any> = [];

  constructor(private _ele: ElementRef,
    private _pTicket: PlaneTicketRepo,
    private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.getHistory();
    this.reset = this.onReset;

    this.listFavoriteLocation();

  }

  ngOnChanges() {
    this.keyword = '';
    this.sources = [];
    this.getHistory();
  }

  onReset() {
    this.keyword = '';
    this.sources = [];
    this.getHistory();
  }

  // fn on close popup
  onClose = () => {
    this.hide();
  };

  // select location
  onSelect = (location: any = {}, mode: string = 'history') => {

    this.keyword = '';
    this.onClose();
    location['type'] = this.type;
    this.select.emit(location);

    // push in history
    if (mode == 'result') {
      if (!this.findExistingHistory(location.code)) {

        this.history.unshift({
          location: location.location,
          name: location.name,
          code: location.code
        });
        this._storage.setItem(CSTORAGE.FLIGHT_LOCATION, this.history);
      }
    }
  };

  // find existing history
  findExistingHistory(code: string = '') {
    for (let index in this.history) {

      if (this.history[index].code === code) {
        return true;
      }
    }
    return false;
  }

  // result history
  getHistory() {

    let history = this._storage.getItem(CSTORAGE.FLIGHT_LOCATION);
    if (!this.utilityHelper.isNullOrUndefined(history)) {
      if (history.length > 0) {
        this.history = _.take(history, 3);
      }
    }
  }

  // result on change
  onChange = (e: any) => {

    clearTimeout(this.timeout);

    this.isTyping = true;

    this.timeout = setTimeout(() => {
      if (e.length > 1) {
        return this._pTicket
          .getAirportList(e)
          .then(
            (res: any) => {
              this.isTyping = false;
              this.sources = res;
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

  //get favorite location
  listFavoriteLocation() {
    return this._pTicket
      .getFavoriteLocation()
      .then(
        (res: any) => {
          this.sourcesFavorite = res.data;
        },
        (errors: any) => {

        }
      );

  }

}
