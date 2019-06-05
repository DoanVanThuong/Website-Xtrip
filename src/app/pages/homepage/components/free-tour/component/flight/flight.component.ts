import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from "../../../../../../app.base";
import {CheapFlight, FlightSearch, FreeTourFlightItem} from "../../../../../../common/entities";
import {DeviceService, StorageService} from "../../../../../../common/services";
import {FlightRepo} from "../../../../../../common/repos";
import {CSTORAGE, DATE_FORMAT} from "../../../../../../app.constants";
import * as moment from "moment";

@Component({
  selector: 'home-flight-ticket',
  templateUrl: './flight.component.html',
  styleUrls: ['flight.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeFlightComponent extends AppPage {

  @Input() heading: string = '';
  @Input() description: string = '';
  @Input() flights: Array<FreeTourFlightItem> = [];
  @Input() return: string = '';
  @Input() depart: string = '';
  @Input() params: any = {};

  itemsPerRow: number = 3;

  flightSearch: FlightSearch = new FlightSearch({
    Adult: 1,
    RoundTrip: false
  });

  constructor(protected _device: DeviceService,
              private _storage: StorageService) {
    super();

    this.setDeviceMode(this._device);
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoadResize($event) {

    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerRow = 1;
    } else if (width < 768) {
      this.itemsPerRow = 3;
    }
  }

  // fn generate query params
  generateQueryParams = (flight: FreeTourFlightItem = null): any => {
    return this.utilityHelper.buildQueryParams(
      Object.assign({}, this.flightSearch, {
        Origin: this.params.originCode,
        Destination: this.params.destinationCode,
        DepartDate: moment(this.depart).format(DATE_FORMAT.VALUE),
        ReturnDate: moment(this.return).format(DATE_FORMAT.VALUE),
      })
    );
  };

  // fn on select flight
  onSelectFlight = (): void => {

    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: `${this.params.originName} (${this.params.originCode})`,
      code: this.params.originCode
    });

    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: `${this.params.destinationName} (${this.params.destinationCode})`,
      code: this.params.destinationCode
    });
  };
}
