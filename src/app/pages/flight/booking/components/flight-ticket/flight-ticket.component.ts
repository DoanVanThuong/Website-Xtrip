import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {Router} from '@angular/router';
import {Airport, Carrier, Flight} from '../../../../../common/entities';
import {StorageService} from '../../../../../common/services';
import {CSTORAGE} from '../../../../../app.constants';
import {FlightDetailPopup} from '../flight-detail-popup/flight-detail.popup';

@Component({
  selector: 'flight-ticket',
  templateUrl: 'flight-ticket.component.html',
  styleUrls: ['flight-ticket.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightTicketComponent extends AppBase {

  @ViewChild(FlightDetailPopup) detailPopup: FlightDetailPopup;

  mode: number = 1;
  flights: Array<Flight> = [];

  carriers: Array<Carrier> = [];
  airports: Array<Airport> = [];

  constructor(private _router: Router,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {
    this.mode = this._storage.getItem(CSTORAGE.FLIGHT_BOOKING_MODE);

    this.carriers = this._storage.getItem(CSTORAGE.CARRIER) || [];
    this.airports = this._storage.getItem(CSTORAGE.AIRPORT) || [];

    if (this.utilityHelper.isNullOrUndefined(this.mode)) {
      this._router.navigate(['/flight/result']);
    }

    this.getFlightDetail();
  }

  ngOnDestroy() {

  }

  // fn get flight detail of
  getFlightDetail = (): void => {
    let departTicket = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1) || this._router.navigate(['/flight/result']);
    this.flights.push(new Flight(departTicket));

    if (Number(this.mode) === 2) {
      let returnTicket = this._storage.getItem(CSTORAGE.FLIGHT_2WAY2);
      this.flights.push(new Flight(returnTicket));
    }

    this.flights = this.flights.map((ticket: Flight) => {
      return new Flight(Object.assign(ticket, {
        airports: _.chain(ticket.legs)
          .groupBy('carrier')
          .map((carriers, carrierCode) => {
            const carrier = this.carriers.find((carrier) => carrier.code === carrierCode);
            return {carriers, carrierCode, carrier};
          })
          .value()
      }));
    });
  };

  // fn open ticket detail
  onOpenTicketDetail = (ticket: Flight = null): void => {
    this.detailPopup.show();
  };

  // fn get carrier with
  getCarrierWith = (code: string = '', field: string = 'name'): any => {
    return this.utilityHelper.findInListWith(code, this.carriers || [], 'code', field || 'name');
  };

  // fn get airport with
  getAirportWith = (code: string = '', field: string = 'name') => {
    return this.utilityHelper.findInListWith(code, this.airports, 'code', field);
  };

}
