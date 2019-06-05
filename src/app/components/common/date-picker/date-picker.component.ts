import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {AppPage} from '../../../app.base';
import * as moment from 'moment';
import {UtilityHelper} from '../../../common/helpers';

const Headers: any = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
const DateOptions: any = {
  length: 12,
  months: 12,
  format: 'YYYY-DD-MM',
  startOfWeek: 0, // [0-6)
  single: false,
  headers: Headers,
  isOtherDateShow: false,
  isDisableLastDatesInMonth: true,
  isNextButtonShow: false
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent extends AppPage {

  @Input() data: any = {start: null, end: null};
  @Input() available: any = [];
  @Input() options: any = DateOptions;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input('style') style ?: string = '';
  @Input() theme: string = 'theme-default';

  rows: number = 6;
  cols: number = 7;
  headers: Array<any> = [];
  months: Array<any> = [];
  now: any = moment([
    moment().year(),
    moment().month(),
    moment().date(),
  ]);

  firstMonth: any = moment(); // current month

  selected: any = {
    start: null,
    end: null
  };

  daysPerWeek: number = 7;
  counter: number = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    this.handleOptions();
    this.buildCalendar();
  }

  ngOnChanges() {
    if (!this.options) {
      this.options = DateOptions;
    } else {
      this.options = Object.assign(DateOptions, this.options);
    }

    if (!this.data) {
      this.selected = {
        start: null,
        end: null
      };
    } else if (typeof(this.data) === 'string') {
      this.selected = {
        start: UtilityHelper.isDate(this.data) ? moment(this.data) : null,
        end: null
      };
    } else {
      this.selected = Object.assign(this.selected, this.data);
    }


    this.handleOptions();
    this.buildCalendar();
  }

  ngAfterViewInit() {

  }

  // fn handle options
  handleOptions = () => {

    this.options.startOfWeek = this.options.startOfWeek % this.daysPerWeek;

    let headers = [];
    for (let i = 0; i < this.options.headers.slice(0, this.cols).length; i++) {
      headers.push(this.options.headers[(i + this.options.startOfWeek) % this.cols]);
    }

    this.headers = headers;
  };

  // fn build calendar
  buildCalendar = (now: any = null): void => {

    // months list
    this.months = [];
    for (let i = 0; i < this.options.months; i++) {

      let month = this.firstMonth.clone().add(i, 'month');

      let firstDayOfWeek = moment([month.year(), month.month(), 1]).day();
      if (!firstDayOfWeek) {
        firstDayOfWeek = this.daysPerWeek - firstDayOfWeek;
      }

      const rows = this.countWeekOfMonth(month, this.options.startOfWeek);

      let dates = [];
      for (let row = 0; row < rows; row++) {
        dates[row] = [];

        for (let col = 0; col < this.daysPerWeek; col++) {

          let position = row * this.headers.length + col;
          let date: any = moment(new Date(
            month.year(),
            month.month(),
            position + 1 - firstDayOfWeek + this.options.startOfWeek // check here
          ));
          // let item = this.findItemInDataList(date, this.available);
          dates[row].push({
            value: date,
            disabled: this.onDisabledDate(date, month),
            // available: !!item ? false : true
          });
        }
      }

      this.months.push({
        month: month,
        firstDayOfWeek: firstDayOfWeek,
        rows: rows,
        dates: dates
      });
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
  // fn convert number to array
  convertNumberToArray = (number: number = 0) => {
    return Array.from(Array(Number(number)).keys()).map(i => i);
  };

  // fn on select next month
  onSelectNextMonth = (unit: number = 1) => {
    this.buildCalendar(this.firstMonth.add(unit, 'month'));
  };

  // fn select date
  onSelectDate = (date: any, disabled: boolean = false, available: boolean = true) => {

    if (!!date && !disabled /*&& available*/)
      if (this.options.single) {

        this.selected = {
          start: date,
          end: null
        };
        this.counter = 0;
        this.onChange(this.selected);
        this.onSubmit(this.selected);

      } else {

        if (this.counter === 0) {
          this.selected = {
            start: date,
            end: null
          };
        } else {
          this.selected.end = date;
        }

        // compare selected date
        if (!!this.selected.start && !!this.selected.end && moment(this.selected.start).diff(moment(this.selected.end)) > 0) {

          this.selected = {
            start: this.selected.end,
            end: this.selected.start
          };
        }

        this.counter++;
        if (this.counter > 1) {
          this.counter = 0;
        }

        this.onChange(this.selected);

        // submit when range is selected
        if (!!this.selected.start && !!this.selected.end) {

          this.onSubmit(this.selected);
        }
      }
  };

  // fn on detect date range
  onDateRange = (date: any): boolean => {

    if (!!date && !!this.selected.start && !!this.selected.end) {

      let start = moment(this.selected.start);
      let end = moment(this.selected.end);

      // in range
      return moment(date).diff(start, 'day') > 0 && moment(date).diff(end, 'day') < 0;
    }
  };

  // fn show date
  onShowDate = (date: any, month: any): boolean => {

    if (!this.options.isOtherDateShow) {
      return moment(date).month() === moment(month).month() ? date : '';
    }

    return date;
  };

  // fn detect current date
  onCurrentDate = (date: any): boolean => {
    return this.now.diff(moment(date), 'day') == 0;
  };

  // fn detect disabled date (in past)
  onDisabledDate = (date: any, month: any): boolean => {

    if (!!date) {
      return ((this.options.isDisableLastDatesInMonth && this.now.diff(moment(date, 'day')) > 0) || moment(date).month() !== moment(month).month());
    }

    return true;
  };

  // fn on detect start date
  onStartDate = (date: any): boolean => {
    if (!!date && !!this.selected.start && !!this.selected.end) {
      return moment(this.selected.start).isSame(moment(date), 'day');
    }

    return false;
  };

  // fn detect end date
  onEndDate = (date: any): boolean => {
    if (!!date && !!this.selected.start && !!this.selected.end) {
      return moment(this.selected.end).isSame(moment(date), 'day');
    }

    return false;
  };

  // fn detect selected date
  onSelectedDate = (date: any): boolean => {

    let isSelected: boolean = false;

    if (!!date) {
      if (!!this.selected.start) {
        isSelected = moment(this.selected.start).isSame(moment(date), 'day');

        if (isSelected) {
          return isSelected;
        }
      }

      if (!!this.selected.end) {
        isSelected = moment(this.selected.end).isSame(moment(date), 'day');
      }
    }

    return isSelected;
  };

  // fn show buttons
  onButtonShow = (show: boolean = false) => {
    return this.options.isNextButtonShow && show;
  };

  // value change
  onChange = ($event: any = {}) => {
    this.change.emit($event);
  };

  // value selected
  onSubmit = ($event: any = {}) => {
    this.select.emit($event);
  };

  countWeekOfMonth = (month: any, startDayOfWeek: number = 0): number => {

    let firstDayOfWeek = startDayOfWeek || 0;

    let firstOfMonth = moment(month).startOf('month');
    let lastOfMonth = moment(month).endOf('month');

    let numberOfDaysInMonth = lastOfMonth.date();
    let firstWeekDay = (firstOfMonth.day() - firstDayOfWeek + this.daysPerWeek) % this.daysPerWeek;

    let used = firstWeekDay + numberOfDaysInMonth;

    return Math.ceil(used / this.daysPerWeek);
  };
}
