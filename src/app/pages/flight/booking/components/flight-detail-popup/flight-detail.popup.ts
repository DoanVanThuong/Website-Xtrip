import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Airport, Flight} from '../../../../../common/entities';
import {StorageService} from '../../../../../common/services';
import {PopupBase} from '../../../../../components/popup';
import {CSTORAGE} from '../../../../../app.constants';

@Component({
  selector: 'flight-detail-popup',
  templateUrl: 'flight-detail.popup.html',
  styleUrls: ['flight-detail.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightDetailPopup extends PopupBase {

  @Input() flights: Array<Flight> = [];

  airports: Array<Airport> = [];
  mode: number = 1;
  selectedIndex: number = 0;

  constructor(private _router: Router,
              private _storage: StorageService) {
    super();

    this.onInit = this.initial;
  }

  initial = () => {
    this.selectedIndex = 0;
  };

  ngOnInit() {
    this.mode = Number(this._storage.getItem(CSTORAGE.FLIGHT_BOOKING_MODE)) || 1;
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT) || [];
  }

  ngOnChanges() {

  }

  ngOnDestroy() {

  }

  // fn on select ticket
  onSelectTicket = (turn: number = 0): void => {
    if (this.selectedIndex === turn) {
      return;
    }
    this.selectedIndex = turn;
  };

}
