import {Component, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../../app.base';
import {DeviceService, StorageService} from '../../../../common/services/index';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {CSTORAGE} from '../../../../app.constants';
import {FlightRepo} from '../../../../common/repos/index';
import {CheapFlight, FlightSearch} from '../../../../common/entities';
import {CheapFlightCalendarPopup} from '../../../../components';

@Component({
  selector: 'home-cheap-flight',
  templateUrl: './cheap-flight.component.html',
  styleUrls: ['cheap-flight.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCheapFlightComponent extends AppPage {

  @ViewChild(CheapFlightCalendarPopup) calendarPopup: CheapFlightCalendarPopup;

  mode: string;
  flights: Array<CheapFlight> = [];
  flightSearch: FlightSearch = new FlightSearch({
    Adult: 1,
    RoundTrip: false
  });
  selectedFlight: CheapFlight = new CheapFlight();
  itemsPerRow: number = 3;

  // slider options
  carouselOptions: any = {
    navigation: !this.isMobile,
    nav: !this.isMobile,
    navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
    navClass: ['owl-prev', 'owl-next'],
    lazyLoad: true,
    autoWidth: true,
    margin: 15,
    dots: false
  };

  constructor(private _storage: StorageService,
              private _router: Router,
              protected _device: DeviceService,
              protected _flightRepo: FlightRepo) {
    super();

    this.setDeviceMode(this._device);
    this.carouselOptions = Object.assign(this.carouselOptions, {
      navigation: !this.isMobile,
      nav: !this.isMobile
    });
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  onLoad($event: any) {

    const width = window.innerWidth;

    if (width < 576) {
      this.itemsPerRow = 1;
    } else if (width < 992) {
      this.itemsPerRow = 2;
    } else {
      this.itemsPerRow = 3;
    }
  }

  ngOnInit() {

    this.getFlights();
  }

  // fn get cheap flights
  getFlights = () => {

    return this._flightRepo
      .getCheapFlights()
      .then(
        (res: any) => {
          this.flights = res.data.cheapFares.map((flight: any) => new CheapFlight(flight));
          this._storage.setItem(CSTORAGE.FLIGHT_CHEAP, this.flights);
        }
      );
  };

  // fn on select date in calendar
  onSelectDate = ($event: any): void => {
    this.flightSearch.DepartDate = moment($event.date).format('YYYY-MM-DD');

    if (this.mode === 'item-selected') {
      this._storage.setItem(CSTORAGE.FLIGHT_START, {
        view: `${this.selectedFlight.originAirport.name} (${this.selectedFlight.originAirport.code})`,
        code: this.selectedFlight.origin
      });

      this._storage.setItem(CSTORAGE.FLIGHT_END, {
        view: `${this.selectedFlight.destinationAirport.name} (${this.selectedFlight.destinationAirport.code})`,
        code: this.selectedFlight.destination
      });
    }

    this._router.navigate(['/flight/result'], {
      queryParams: this.utilityHelper.buildQueryParams(this.flightSearch)
    });
  };

  // fn on select flight from list
  onSelectFlight = ($event: CheapFlight = new CheapFlight()): void => {

    this.mode = 'item-selected';
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

  // fn fn select date from search box
  onSubmitSearch = ($event: any): void => {
    this.mode = null;

    this.flightSearch = $event;
    this.calendarPopup.params = $event;
    this.calendarPopup.show();

  };
}
