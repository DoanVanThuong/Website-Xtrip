import {AppPage} from '../../../../../app.base';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../../../../common/services';
import {PlaneTicketRepo} from '../../../../../common/repos';
import {CSTORAGE} from '../../../../../app.constants';
import {Airport, Carrier, Flight, FlightSearch} from '../../../../../common/entities';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {UtilityHelper} from '../../../../../common/helpers';
import {environment} from '../../../../../../environments/environment';
import * as _ from 'lodash';


@Component({
  selector: 'app-flight-item-desktop',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightItemComponent extends AppPage {

  @Input() flight: Flight = new Flight();
  @Input() carriers: Array<Carrier> = [];
  @Input() airports: Array<Airport> = [];
  @Input('showDetail') isDetail: boolean = true;
  @Input('round-trip') isRoundTrip: boolean = false;

  @Output('select') select: EventEmitter<Flight> = new EventEmitter<Flight>();

  airplanes: Array<any> = [];
  isExpanded: boolean = false;

  constructor(private _router: Router,
              private _location: Location,
              private _toaster: ToastrService,
              private _storage: StorageService,
              private _pTicketRepo: PlaneTicketRepo) {
    super();
  }

  ngOnInit() {

    this.handleAirplane(this.flight);

    if (!this.carriers.length) {
      this.carriers = this._storage.getItem(CSTORAGE.CARRIER);
    }

    if (!this.airports.length) {
      this.airports = this._storage.getItem(CSTORAGE.AIRPORT);
    }
  }

  ngAfterViewInit() {

  }

  // handle to get airplane group
  handleAirplane = (flight: Flight) => {

    this.airplanes = _.chain(flight.legs)
      .groupBy('carrier')
      .map((carriers, carrierCode) => {
        const carrier = this.carriers.find((carrier) => carrier.code === carrierCode);
        return {carriers, carrierCode, carrier};
      })
      .value();
  };

  // fn get carrier with
  getCarrierWith = (code: string = '', field: string = 'name'): string => {
    const carrier = _.find(this.carriers, (item: any) => {
      return item.code === code;
    });

    return !!carrier ? carrier[field] : '';
  };

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name'): string => {
    const airport = _.find(this.airports, (item: any) => {
      return item.code === code;
    });

    return !!airport ? airport[field] : '';
  };

  //get Location name by location code
  getLocationName(code: string = '') {

    const airport = _.find(this.airports, (item: any) => {
      return item.code === code;
    });

    if (!airport) {
      return;
    }
    return airport.shortLocation;
  }

  //get rest time
  restTime(data?: any) {
    return `Quá cảnh tại <strong>${this.getLocationName(data.origin)}</strong> trong <strong>${this.utilityHelper.durationTime(data.timePending)}</strong>`;
  }

  // fn on select flight
  onSelect = ($event: any) => {

    this.select.emit(this.flight);
  };
}