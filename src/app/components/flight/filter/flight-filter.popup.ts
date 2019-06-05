import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Carrier, Flight, FlightFilter, StorageService} from '../../../common/index';
import {CSTORAGE, FLIGHT_FILTER} from '../../../app.constants';
import {PopupBase} from '../../popup/popup.base';
import {FlightFilterOptions} from '../../../common/entities';
import {GlobalState} from '../../../global.state';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'flight-filter-popup',
  templateUrl: './flight-filter.popup.html',
  styleUrls: ['./flight-filter.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class FlightFilterPopup extends PopupBase {

  @Input() data: any = null;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateCounter: EventEmitter<any> = new EventEmitter<any>();

  originalFilter: any = {
    sort: null,
    depart: [0, 24],
    landing: [0, 24],
    carrier: 'all',
    point: FLIGHT_FILTER.stop.all
  };
  filter: FlightFilter = new FlightFilter({
    sort: null,
    points: [FLIGHT_FILTER.stop.all],
    depart: [0, 24],
    landing: [0, 24],
    carriers: ['all']
  });
  filterOptions: FlightFilterOptions = new FlightFilterOptions({
    sorts: [
      {
        index: FLIGHT_FILTER.sort.price,
        name: 'Giá thấp nhất'
      },
      {
        index: FLIGHT_FILTER.sort.depart,
        name: 'Chuyến bay khởi hành sớm nhất'
      },
      {
        index: FLIGHT_FILTER.sort.landing,
        name: 'Chuyến bay đến sớm nhất'
      },
      {
        index: FLIGHT_FILTER.sort.duration,
        name: 'Thời gian bay ngắn nhất'
      }
    ],
    points: [
      {
        index: FLIGHT_FILTER.stop.all,
        name: 'Tất cả'
      },
      {
        index: FLIGHT_FILTER.stop.stop0,
        name: 'Bay thẳng'
      },
      {
        index: FLIGHT_FILTER.stop.stop1,
        name: '1 điểm dừng'
      },
      {
        index: FLIGHT_FILTER.stop.more,
        name: '+2 điểm dừng'
      }
    ],
    depart: [0, 24],
    landing: [0, 24],
    carriers: [
      {code: 'all', icon: 'assets/images/icon/icon-flight-orange.svg', name: 'Tất cả', price: 0}
    ]
  });

  labelSlider = {
    depart: {
      start: '0h',
      end: '24h'
    },
    landing: {
      start: '0h',
      end: '24h'
    }
  };

  sliderConfig: any = {
    behaviour: 'drag',
    start: [0, 24],
    step: 0.5,
    margin: 3.0,
    range: {
      min: 0,
      max: 24
    },
    connect: true
  };

  ranger: any = {
    depart: [0, 24],
    landing: [0, 24]
  };

  constructor(private _state: GlobalState,
              private _storage: StorageService) {
    super();
    this.onInit = this.onInitial;
  }

  ngOnInit() {

    this._state.subscribe('carriers:updated', (carriers: Array<Carrier> = []) => {
      this.getCarriers(this.filter);
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.filter = this.utilityHelper.mergeRecursive(this.filter, this.data);

      this.setRangeSlider();
      this.onUpdateFilter();
    }

    this.getCarriers(this.filter);
  }

  // fn initial
  onInitial = () => {

  };

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

    this.filterOptions.carriers = [{code: 'all', icon: 'assets/images/icon/icon-flight-orange.svg', name: 'Tất cả', price: 0}];
    let carriers = this._storage.getItem(CSTORAGE.CARRIER) || [];
    let flights = this._storage.getItem(CSTORAGE.FILTER_DATA) || [];

    flights.map((flight: Flight) => {

      let carrier = carriers.find((item) => {
        return flight.carrier === item.code;
      });

      const departHour = moment(flight.departTime).hour() + moment(flight.departTime).minute() / 60;
      if (departHour < range.depart.start || range.depart.end < departHour) {
        return;
      }

      const landingHour = moment(flight.landingTime).hour() + moment(flight.landingTime).minute() / 60;
      if (landingHour < range.landing.start || range.landing.end < landingHour) {
        return;
      }

      // filter-popup-popup carrier list by selected stop point
      if (point.all
        || ((point.stop0 && flight.stops === 0)
          || (point.stop1 && flight.stops === 1)
          || (point.more && flight.stops >= 2))
      ) {
        if (!_.includes(this.filterOptions.carriers, carrier)) {

          this.filterOptions.carriers.push({
            icon: carrier.icon,
            code: carrier.code,
            name: carrier.name,
            price: flight.totalPrice
          });
        }

        // remove duplicate carrier
        this.filterOptions.carriers = _.unionBy(this.filterOptions.carriers, 'code');
      }
    });

    // sort price in carriers list
    this.filterOptions.carriers = _.sortBy(this.filterOptions.carriers, 'price');
  };

  // fn on select sort
  onSelectSort = (sort: any) => {
    this.filter.sort = sort;
  };

  // fn on select points
  onSelectPoint = (point: any = FLIGHT_FILTER.stop.all) => {

    if (point !== FLIGHT_FILTER.stop.all) {

      // remove 'all' item in list
      let index = this.filter.points.indexOf(FLIGHT_FILTER.stop.all);
      if (index !== -1) {
        this.filter.points.splice(index, 1);
      }

      // check if not exist, push item to array highlight, and remove if exist

      index = this.filter.points.indexOf(point);
      if (index === -1) {
        this.filter.points.push(point);
      } else {
        this.filter.points.splice(index, 1);
      }

      //check all if object []
      if (!this.filter.points.length) {
        this.filter.points = [FLIGHT_FILTER.stop.all];
      }

    } else {
      this.filter.points = [point];
    }

    // filter-popup-popup carrier list with selected points
    this.getCarriers(this.filter);
  };

  // Highlight selected item
  isStopPointSelected(list: Array<any> = [], point: any = null) {
    return list.indexOf(point) !== -1;
  }

  // fn set range slider
  setRangeSlider = () => {

    if (!this.utilityHelper.isNullOrUndefined(this.filter.depart) && this.filter.depart.length) {
      this.labelSlider.depart = {
        start: this.getLabelTime(this.filter.depart[0]),
        end: this.getLabelTime(this.filter.depart[1])
      };
    }
    if (!this.utilityHelper.isNullOrUndefined(this.filter.depart) && this.filter.landing.length) {
      this.labelSlider.landing = {
        start: this.getLabelTime(this.filter.landing[0]),
        end: this.getLabelTime(this.filter.landing[1])
      };
    }

  };

  // fn slider change
  onSliderChange = ($event: any, type: any) => {

    switch (type) {
      case 'depart': {
        this.filter.depart = $event;
        this.labelSlider.depart.start = this.getLabelTime($event[0]);
        this.labelSlider.depart.end = this.getLabelTime($event[1]);
        break;
      }
      case 'landing': {
        this.filter.landing = $event;
        this.labelSlider.landing.start = this.getLabelTime($event[0]);
        this.labelSlider.landing.end = this.getLabelTime($event[1]);
        break;
      }
    }

    this.getCarriers(this.filter);
  };

  //get label time for slider
  getLabelTime(time) {
    if (Number.isInteger(time)) {
      return `${time}h`;
    } else {
      return `${Math.floor(time)}h30p`;
    }
  }

  isCarrierSelected = (list: Array<any> = [], code: any = null): boolean => {
    return list.indexOf(code) !== -1;
  };

  // fn on select carrier
  onSelectCarrier(code: any) {

    if (code !== 'all') {

      // remove 'all' item in list
      let index = this.filter.carriers.indexOf('all');
      if (index !== -1) {
        this.filter.carriers.splice(index, 1);
      }

      // check if not exist, push item to array highlight, and remove if exist

      index = this.filter.carriers.indexOf(code);
      if (index === -1) {
        this.filter.carriers.push(code);
      } else {
        this.filter.carriers.splice(index, 1);
      }

      //check all if object []
      if (!this.filter.carriers.length) {
        this.filter.carriers = ['all'];
      }

    } else {
      this.filter.carriers = [code];
    }
  }

  // fn on reset filter-popup-popup
  onReset = (): void => {

    this.filter = new FlightFilter({
      sort: null,
      points: [FLIGHT_FILTER.stop.all],
      depart: [0, 24],
      landing: [0, 24],
      carriers: ['all']
    });

    this.ranger.depart = [0, 24];
    this.ranger.landing = [0, 24];

    this.getCarriers(this.filter);
  };

  onSubmit = (): void => {
    this.submit.emit(this.filter);
    this.onUpdateFilter();
    this.hide();
  };

  // fn update filter-popup-popup
  onUpdateFilter = (): void => {

    this.updateCounter.emit(this.filter.countFilter(this.originalFilter));
  };
}
