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
  isDisableLastDatesInMonth: true,
  isNextButtonShow: false
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerV2Component extends AppPage {

  @Input() data: Array<any> = [];
  @Input() date: any = moment();
  @Input() headers: Array<any> = Headers;
  @Input() options: any = DateOptions;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  month: any = moment();
  now: any = moment();
  dates: Array<any> = [];

  rows: number = 6;
  daysPerWeek: number = 7;

  constructor() {
    super();
  }

  ngOnInit() {
    this.handleOptions();
    this.buildCalendar(moment(this.date) || moment());
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {

    if (!this.options) {
      this.options = DateOptions;
    } else {
      this.options = Object.assign(DateOptions, this.options);
    }

    if (!this.date) {
      this.month = this.date;
    } else {
      this.month = moment(this.date);
    }

    this.buildCalendar(this.month);
  }

  // fn handle options
  handleOptions = () => {

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

  // fn on select next month
  onSelectNextMonth = (option: string) => {
    if (option === 'next') {
      this.month = moment(this.month).add(1, 'month');

      this.buildCalendar(this.month);
      this.change.emit(this.month);
    }

    else {
      if (this.month.month() + 1 == this.now.month() + 1) {
        return;
      }
      else {
        this.month = moment(this.month).add(-1, 'month');
        this.buildCalendar(this.month);
        this.change.emit(this.month);
      }
    }
  };

  checkMonthInPast(date: string): boolean {
    const currentMonth: number = moment().month() + 1;
    const month: number = moment(date).month() + 1;

    const year: number = moment(date).year();
    const currentYear: number = moment().year();

    if (currentYear === year) {
      if (currentMonth > month) {
        return true;
      }
      return false;
    }
    if (currentYear < year) {
      return false;
    }

  }

  // fn build calendar
  buildCalendar = (currentDate: any = null): void => {

    let firstDayOfWeek = moment([currentDate.year(), currentDate.month(), 1]).day();

    this.dates = [];
    for (let row = 0; row < this.rows; row++) {
      this.dates[row] = [];

      for (let col = 0; col < this.daysPerWeek; col++) {

        let position = row * this.headers.length + col;
        let date: any = moment(new Date(
          currentDate.year(),
          currentDate.month(),
          position + 1 - firstDayOfWeek + this.options.startOfWeek
        ));

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

  // fn show buttons
  onButtonShow = (show: boolean = false) => {
    return this.options.isNextButtonShow && show;
  };

  // fn detect current date
  onCurrentDate = (date: any): boolean => {
    return this.now.format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
  };


  // fn detect disabled date (in past)
  onDisabledDate = (data: any): boolean => {
    if (moment(data.date).diff(moment(), 'd') < 0 || data.price <= 0) {
      return true;
    }
    return false;
  };

  // fn on select callback
  onSelectDate = ($event: any = null) => {
    if (moment($event.date).diff(moment(), 'd') >= 0 && $event.price > 0) {
      this.select.emit($event.data);
    }
  };
}
