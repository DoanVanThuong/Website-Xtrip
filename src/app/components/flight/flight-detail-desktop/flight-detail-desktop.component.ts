import {AppPage} from '../../../app.base';
import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../../common/services/index';
import {CSTORAGE} from '../../../app.constants';
import {Airline, Airport, Carrier, Flight} from '../../../common/entities/index';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {UtilityHelper} from '../../../common/helpers/index';
import {environment} from '../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-flight-detail-desktop',
  templateUrl: './flight-detail-desktop.component.html',
  styleUrls: ['./flight-detail-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightDetailDesktopComponent extends AppPage {

  @Input() flight: any;
  @Input() carriers: Carrier[] = [];
  @Input() airports: Airport[] = [];
  @Input('isCollapse') collapse: boolean = false;
  @Input('point') isPoint: boolean = true;
  @Input('is-condition') isCondition: boolean = true;

  urlImageLogoCarrier: string = environment.API_STATIC_URL + '/Image/Airline/Logo/70px/';

  constructor(private _router: Router,
              private _location: Location,
              private _toaster: ToastrService,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    if (!this.carriers.length) {
      this.carriers = this._storage.getItem(CSTORAGE.CARRIER);
    }

    if (!this.airports.length) {
      this.airports = this._storage.getItem(CSTORAGE.AIRPORT);
    }
  }

  ngAfterViewInit() {
  }

  // fn get carrier with
  getCarrierWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.carriers, 'code', field);
  };

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name'): string => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field);
  };

  //get rest time
  restTime(data?: any) {
    return `Quá cảnh tại <strong>${this.getAirportWith(data.origin, 'shortName')}</strong> trong <strong>${this.utilityHelper.durationTime(data.timePending)}</strong>`;
  }
}