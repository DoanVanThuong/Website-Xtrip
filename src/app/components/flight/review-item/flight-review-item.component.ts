import {Component, Input} from '@angular/core';
import {AppPage} from '../../../app.base';
import {StorageService} from '../../../common/services';
import {CSTORAGE} from '../../../app.constants';
import {Airline, Airport, Flight} from '../../../common/entities';
import {environment} from '../../../../environments/environment';
import {UtilityHelper} from '../../../common/helpers';
import * as moment from 'moment';

@Component({
  selector: 'flight-review-item',
  templateUrl: './flight-review-item.component.html'
})
export class FlightReviewItemComponent extends AppPage {

  @Input('heading') heading: string = '';
  @Input('flight') flight: Flight;

  @Input('mode') mode: string = '';//search: from review, review flight; my-booking: from my booking page

  //transfer airport and airline data from my booking
  @Input() airports: Airport[] = [];
  @Input('airlines') carriers: Airline[] = [];

  urlImg = environment.API_STATIC_URL;

  constructor(private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    if (this.mode === 'search') {//mode: search
      this.carriers = this._storage.getItem(CSTORAGE.CARRIER) || [];
      this.airports = this._storage.getItem(CSTORAGE.AIRPORT) || [];
    }
  }

  // fn get carrier with
  getCarrierWith = (code: string = '', field: string = 'name'): any => {
    return this.utilityHelper.findInListWith(code, this.carriers || [], 'code', field || 'name');
  };

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name') => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field);
  };

  //get rest time
  restTime(data?: any) {
    return `Nghỉ tại <strong>${data.origin}</strong> trong <strong>${this.utilityHelper.durationTime(data.timePending)}</strong>`;
  }
}