import {Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {PopupBase} from '../../popup';
import {FlightSearch} from '../../../common/entities';
import {FlightRepo} from '../../../common/repos';
import {StorageService} from '../../../common/services';

@Component({
  selector: 'cheap-flight-calendar-popup',
  templateUrl: './cheap-flight-calendar.popup.html',
  styleUrls: ['cheap-flight-calendar.popup.less'],
  encapsulation: ViewEncapsulation.None
})

export class CheapFlightCalendarPopup extends PopupBase {

  @Input() params: FlightSearch = new FlightSearch();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  flights: Array<any> = [];
  currentMonth: any = moment().add(1, 'month');
  flightSearch: any = {
    originAirport: {
      code: '',
    },
    destinationAirport: {
      code: '',
    },
    adults: 1,
    children: 0,
    infants: 0,
    year: this.currentMonth.year(),
    month: this.currentMonth.month() + 1
  };
  counter: number = 0;
  isLoading: boolean = false;


  constructor(private _ele: ElementRef,
              private _flightRepo: FlightRepo,
              private _storage: StorageService) {
    super();

    this.onInit = this.onInit;
  }

  onInit = () => {

    this.currentMonth = moment().add(1, 'month');
    this.flightSearch = {
      originAirport: {
        code: this.params.Origin,
      },
      destinationAirport: {
        code: this.params.Destination,
      },
      adults: this.params.Adult || 1,
      children: this.params.Child || 0,
      infants: this.params.Infant || 0,
      month: this.currentMonth.month() + 1,
      year: this.currentMonth.year()
    };

    this.getCheapFlights();
  };

  ngAfterViewInit() {
  }

  ngOnChanges() {

  }

  // fn disable button next/prev
  onDisabledPrevMonth = (): boolean => {
    return this.currentMonth.diff(moment().add(1, 'month').subtract(1, 'day'), 'month') <= 0;
  };

  onDisabledNextMonth = (): boolean => {
    return this.currentMonth.diff(moment().add(1, 'month').subtract(1, 'day'), 'month') > 11;
  };

  // on select next month - change month
  onSelectNextMonth = (unit: number = 0): void => {
    this.currentMonth.add(unit, 'month');

    this.flightSearch.month = this.currentMonth.month() + 1;
    this.flightSearch.year = this.currentMonth.year();

    this.getCheapFlights();
  };

  // fn get cheap flights
  getCheapFlights = (): Promise<any> => {

    this.counter++;
    this.isLoading = true;

    return this._flightRepo
      .searchCheapFlights(this.flightSearch)
      .then(
        (res: any) => {
          if (res.isPending && this.counter <= 3) {
            this.getCheapFlights();
          } else {
            this.flights = res.calendar.map(item => {
              return {
                date: moment(item.departDate),
                data: item,
                price: item.price,
                isLowest: item.isLowest,
                isDisabled: item.isDisabled
              };
            });

            this.isLoading = false;
            this.counter = 0;
          }
        }, (errors: Error[] = []) => {

          this.flights = [];
          this.isLoading = false;
          this.counter = 0;
        }
      );
  };

  // fn on select date
  onSelectDate = ($event: any): void => {
    this.select.emit($event);
  };
}