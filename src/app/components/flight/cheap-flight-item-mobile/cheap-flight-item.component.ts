import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AppPage} from '../../../app.base';
import {CheapFlight, Flight} from '../../../common/entities';
import {CSTORAGE} from '../../../app.constants';
import {StorageService} from '../../../common/services';

@Component({
  selector: 'cheap-flight-item-mobile',
  templateUrl: './cheap-flight-item.component.html',
  styleUrls: ['cheap-flight-item.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CheapFlightItemMobileComponent extends AppPage {

  @Input() flight: CheapFlight = new CheapFlight();

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _router: Router,
              private _storage: StorageService) {
    super();
  }

  // fn generate cheap flight params
  generateCheapFlightParams = (flight: CheapFlight): Object => {
    return {
      Origin: flight.origin,
      Destination: flight.destination,
      RoundTrip: false,
      Adult: 1
    };
  };

  // on select ticket to storage history
  onSelectTicket = (flight: CheapFlight) => {

    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: `${flight.originAirport.name} (${flight.originAirport.code})`,
      code: flight.originAirport.code
    });

    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: `${flight.destinationAirport.name} (${flight.destinationAirport.code})`,
      code: flight.destinationAirport.code
    });

  };
}
