import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import * as moment from 'moment';

const Headers: any = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
const DateOptions: any = {
  format: 'YYYY-DD-MM',
  startOfWeek: 0, // [0-6)
  single: false,
  headers: Headers,
  isOtherDateShow: false,
  isDisableLastDatesInMonth: true, // disable lastest date
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent extends AppPage {

  @Input() data: Array<any> = [];
  @Input() month: number = moment().month();
  @Input() year: number = moment().year();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  @Input() headers: Array<any> = Headers;
  @Input() options: any = DateOptions;

  private now: any = moment();
  private dates: Array<any> = [];

  rows: number = 6;
  daysPerWeek: number = 7;

  constructor() {
    super();
  }

  ngOnInit() {
    this.handleOptions();
    this.buildCalendar(moment([this.year, this.month, 1]));
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
    this.buildCalendar(moment([this.year, this.month, 1]));
  }

  // fn handle options
  handleOptions = () => {

    this.options = Object.assign({}, DateOptions, this.options);

    this.options.startOfWeek = this.options.startOfWeek % this.daysPerWeek;

    let headers = [];
    for (let i = 0; i < this.options.headers.slice(0, this.daysPerWeek).length; i++) {
      headers.push(this.options.headers[(i + this.options.startOfWeek) % this.daysPerWeek]);
    }

    this.headers = headers;
  };

  // fn convert number to array
  convertNumberToArray = (number: number = 0) => {
    return Array.from(Array(Number(number)).keys()).map(i => i);
  };

  // fn build calendar
  buildCalendar = (month: any = null): void => {

    let firstDayOfWeek = moment([month.year(), month.month(), 1]).day();

    if (!firstDayOfWeek) {
      firstDayOfWeek = this.daysPerWeek - firstDayOfWeek;
    }

    this.dates = [];
    for (let row = 0; row < this.rows; row++) {
      this.dates[row] = [];

      for (let col = 0; col < this.daysPerWeek; col++) {

        let position = row * this.headers.length + col;
        let date: any = moment(
          new Date(
            month.year(),
            month.month(),
            position + 1 - firstDayOfWeek + this.options.startOfWeek
          )
        );

        let item = this.findItemInDataList(date, this.data);

        this.dates[row].push({
          date: date,
          price: Math.floor((!!item ? item.price : 0) / 1000),
          isLowest: !!item ? item.isLowest : false,
          data: !!item ? item.data : null
        });
      }
    }

  };

  // fn find date in list
  findItemInDataList = (date: any = null, list: Array<any> = []) => {

    if (!date && !list.length) {
      return null;
    }

    return _.find(list, (item) => {
      return moment(item.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
    });
  };

  // fn show date
  onShowDate = (date: any): boolean => {

    if (!this.options.isOtherDateShow) {
      return moment(date).month() === Number(this.month) ? date : '';
    }

    return date;
  };

  // fn detect disabled date (in past)
  onDisabledDate = (date: any): boolean => {
    if (!!date) {
      return ((this.options.isDisableLastDatesInMonth && this.now.diff(moment(date, 'day')) > 0) || moment(date).month() !== Number(this.month));
    }

    return true;
  };

  // fn on select callback
  onSelectDate = ($event: any = null) => {

    if (!this.onDisabledDate($event.date)) {
      this.select.emit($event);
    }
  };
}
