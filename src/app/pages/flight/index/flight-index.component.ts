import {Component, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import {Router} from '@angular/router';
import {FlightRepo} from '../../../common/repos';
import {CheapFlight, Error, FlightSearch} from '../../../common/entities';
import {DeviceService, StorageService} from '../../../common/services';
import * as moment from 'moment';
import {CSTORAGE} from '../../../app.constants';
import {CheapFlightCalendarPopup} from '../../../components';

@Component({
  selector: 'app-tour-index',
  templateUrl: './flight-index.component.html',
  styleUrls: ['./flight-index.component.less',],
  encapsulation: ViewEncapsulation.None
})

export class FlightIndexComponent extends AppPage {

  @ViewChild(CheapFlightCalendarPopup) calendarPopup: CheapFlightCalendarPopup;

  flights: CheapFlight[] = [];
  selectedFlight: CheapFlight = null;
  flightSearch: FlightSearch = new FlightSearch();

  itemsPerRow: number = 4;
  isLoading: boolean = false;

  constructor(private _router: Router,
              private _flightRepo: FlightRepo,
              private _storage: StorageService,
              private _device: DeviceService) {
    super();

    this.setDeviceMode(_device);
  }

  ngOnInit() {
    if (this.isMobile) {
      this._router.navigate(['flight/search']);
    }

    this.getFlights();
  }

  ngAfterViewInit() {

  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event) {

    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerRow = 1;
    } else if (width < 768) {
      this.itemsPerRow = 2;
    } else if (width < 992) {
      this.itemsPerRow = 3;
    } else {
      this.itemsPerRow = 4;
    }
  }

  // fn get flights
  getFlights = (): Promise<any> => {

    this.isLoading = true;

    return this._flightRepo
      .getCheapFlights()
      .then(
        (res: any) => {
          this.isLoading = false;
          this.flights = res.data.cheapFares.map((flight: any) => new CheapFlight(flight));
        }, (errors: Error[] = []) => {
          this.isLoading = false;
        }
      );
  };

  // on select flight
  onSelectFlight = ($event: CheapFlight): void => {
    this.selectedFlight = $event;
    this.flightSearch = new FlightSearch({
      Adult: 1,
      Cheap: true,
      Destination: $event.destination,
      Origin: $event.origin
    });

    this.calendarPopup.params = this.flightSearch;
    this.calendarPopup.show();
  };

  // fn on select date
  onSelectDate = ($event: any): void => {

    this.flightSearch.DepartDate = moment($event.date).format('YYYY-MM-DD');

    this._storage.setItem(CSTORAGE.FLIGHT_START, {
      view: `${this.selectedFlight.originAirport.name} (${this.selectedFlight.originAirport.code})`,
      code: this.selectedFlight.origin
    });

    this._storage.setItem(CSTORAGE.FLIGHT_END, {
      view: `${this.selectedFlight.destinationAirport.name} (${this.selectedFlight.destinationAirport.code})`,
      code: this.selectedFlight.destination
    });

    this._router.navigate(['/flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(this.flightSearch)
    });
  };
}
