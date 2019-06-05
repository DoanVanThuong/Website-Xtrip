import {AppPage} from '../../../../../app.base';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {StorageService} from '../../../../../common/services';
import {PlaneTicketRepo} from '../../../../../common/repos';
import {CSTORAGE, FLIGHT_FILTER} from '../../../../../app.constants';
import * as moment from 'moment';
import {Carrier, Flight, FlightFilter, FlightFilterOptions} from '../../../../../common/entities';
import {GlobalState} from '../../../../../global.state';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FlightFilterComponent extends AppPage {

  @Input('data') data: any = null;
  @Input('filterOptions') filterOptions: FlightFilterOptions = new FlightFilterOptions({
    sorts: [],
    points: [
      {
        index: FLIGHT_FILTER.stop.stop0,
        name: 'Bay thẳng'
      },
      {
        index: FLIGHT_FILTER.stop.stop1,
        name: '1 điểm'
      },
      {
        index: FLIGHT_FILTER.stop.more,
        name: '+2 điểm'
      }
    ],
    depart: [0, 24],
    landing: [0, 24],
    carriers: []
  });
  @Output('submit') submit: EventEmitter<any> = new EventEmitter<any>();

  filter: FlightFilter = new FlightFilter({
    sort: null,
    points: [],
    depart: [0, 24],
    landing: [0, 24],
    carriers: []
  });

  labelSlider = {
    depart: {
      start: 0,
      end: 24
    },
    landing: {
      start: 0,
      end: 24
    }
  };
  sliderConfig: any = {
    behaviour: 'drag-snap',
    start: [0, 24],
    step: 0.5,
    margin: 3.0,
    range: {
      min: 0,
      max: 24
    },
    connect: true
  };

  constructor(private _router: Router,
              private _pTicket: PlaneTicketRepo,
              private _state: GlobalState,
              private _storage: StorageService) {
    super();
  }

  ngOnInit() {

    this._state.subscribe('carriers:updated', (carriers: Array<Carrier> = []) => {
      // this.getCarriers(this.filter-popup-popup);
    });

    this._state.subscribe('flights:loaded', () => {
      this.getCarriers(this.filter);
    });

  }

  ngOnChanges() {

    if (this.data) {
      this.filter = this.utilityHelper.mergeRecursive(this.filter, this.data);

      this.setRangeSlider();
    }

    this.getCarriers(this.filter);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  // fn get carriers
  getCarriers = (filter: any = {}): void => {

    let point: any = {};
    for (let key in FLIGHT_FILTER.stop) {
      point[key] = filter.points.indexOf(FLIGHT_FILTER.stop[key]) !== -1;
    }

    const range = {
      depart: {
        start: filter.depart[0] || 0,
        end: filter.depart[1] || 24
      },
      landing: {
        start: filter.landing[0] || 0,
        end: filter.landing[1] || 24
      }
    };

    let flightCarriers = [];
    let carriers = this._storage.getItem(CSTORAGE.CARRIER) || [];
    let flights = this._storage.getItem(CSTORAGE.FILTER_DATA) || [];

    _.sortBy(flights, 'price')
      .map((flight: Flight) => {

        let carrier: Carrier = carriers.find((item) => {
          return flight.carrier === item.code;
        });

        if (this.utilityHelper.isNullOrUndefined(carrier)) {
          return;
        }

        const departHour = moment(flight.departTime).hour() + moment(flight.departTime).minute() / 60;
        if (departHour < range.depart.start || range.depart.end < departHour) {
          return;
        }

        const landingHour = moment(flight.landingTime).hour() + moment(flight.landingTime).minute() / 60;
        if (landingHour < range.landing.start || range.landing.end < landingHour) {
          return;
        }

        // filter-popup-popup carrier list by selected stop point
        if (!filter.points.length
          || ((point.stop0 && flight.stops === 0)
            || (point.stop1 && flight.stops === 1)
            || (point.more && flight.stops >= 2))) {
          if (!_.includes(flightCarriers, carrier)) {

            const item = _.find(flightCarriers, (item) => {
              return item.code === carrier.code;
            });

            if (this.utilityHelper.isNullOrUndefined(item)) {
              flightCarriers.push({
                icon: carrier.icon,
                code: carrier.code,
                name: carrier.name,
                price: flight.totalPrice
              });
            }
          }
        }
      });

    // sort price in carriers list
    this.filterOptions.carriers = _.sortBy(flightCarriers, 'price');
  };


  //Highlight selected item
  isStopPointSelected = (list: Array<any> = [], point: any = null): boolean => {
    return list.indexOf(point) !== -1;
  };

  // fn on select points
  onSelectPoint = (point: any = null) => {

    let index = this.filter.points.indexOf(point);
    if (index === -1) {
      this.filter.points.push(point);
    } else {
      this.filter.points.splice(index, 1);
    }

    this.getCarriers(this.filter);

    this.onSubmit();
  };

  // fn set range slider
  setRangeSlider = () => {

    if (!this.utilityHelper.isNullOrUndefined(this.filter.depart) && this.filter.depart.length) {
      this.labelSlider.depart = {
        start: this.filter.depart[0],
        end: this.filter.depart[1]
      };
    }
    if (!this.utilityHelper.isNullOrUndefined(this.filter.depart) && this.filter.landing.length) {
      this.labelSlider.landing = {
        start: this.filter.landing[0],
        end: this.filter.landing[1]
      };
    }

  };

  // fn detect dapart/landing slider
  onSliderChange = ($event: any, type: any) => {

    switch (type) {
      case 'depart': {
        this.filter.depart = $event;
        this.labelSlider.depart.start = $event[0];
        this.labelSlider.depart.end = $event[1];
        break;
      }
      case 'landing': {
        this.filter.landing = $event;
        this.labelSlider.landing.start = $event[0];
        this.labelSlider.landing.end = $event[1];
        break;
      }
    }

    this.getCarriers(this.filter);
  };

  // fn on time set (slider)
  onTimeSet = ($event: any, type: any) => {
    switch (type) {
      case 'depart': {
        this.filter.depart = $event;
        break;
      }
      case 'landing': {
        this.filter.landing = $event;
        break;
      }
    }

    this.onSubmit();
  };

  // fn detect item in list
  isCarrierSelected = (list: Array<any> = [], code: any = null): boolean => {
    return list.indexOf(code) !== -1;
  };

  // fn on select carrier
  onSelectCarrier(code: any) {

    let index = this.filter.carriers.indexOf(code);
    if (index === -1) {
      this.filter.carriers.push(code);
    } else {
      this.filter.carriers.splice(index, 1);
    }

    this.onSubmit();
  }

  // fn on reset filter-popup-popup
  onReset() {

    this.filter = new FlightFilter({
      sort: null,
      points: [],
      depart: [0, 24],
      landing: [0, 24],
      carriers: []
    });

    this.getCarriers(this.filter);
    this.onSubmit();
  }

  onSubmit = (): void => {
    this.submit.emit(this.filter);
  };
};
