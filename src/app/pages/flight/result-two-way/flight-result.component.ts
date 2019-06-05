import {Component, ViewEncapsulation} from '@angular/core';
import {CSTORAGE} from '../../../app.constants';
import {Flight} from '../../../common/index';
import {FlightResultMobileComponent} from '../result/mobile/flight-result-mobile.component';

@Component({
  selector: 'app-search-two-way',
  templateUrl: './flight-result.component.html',
  styleUrls: ['../result/mobile/flight-result-mobile.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightResultWay2Component extends FlightResultMobileComponent {

  ngOnInit() {

    // detect way 1
    let flight = this._storage.getItem(CSTORAGE.FLIGHT_2WAY1);
    if (!flight) {
      this._router.navigate(['/flight/search']);
    }

    this._activatedRoute
      .queryParams
      .subscribe((params) => {
        this.params = params;

        // reset data
        this.flights = [];
        this.tempFlights = [];

        this.handleRouteParams(params);

        if (this.isEmptyQueryParams(params)) {
          // redirect to search screen (depart ticket)

          this._router.navigate(['/flight/search']);
        } else if (this.isDesktop && this.flightSearch.RoundTrip) {
          // redirect to result when active on desktop
          this._router.navigate(['/flight/search'], {
            queryParams: params
          });
        }

        this.getFlights(this.flightSearch);
      });
  }

  // fn select flight 2 way
  onSelectFlight = (flight: Flight): void => {

    this._storage.setItem(CSTORAGE.FLIGHT_2WAY2, flight);
    this.setPassenger();

    this._router.navigate(['/flight/preview']);
  };
}
