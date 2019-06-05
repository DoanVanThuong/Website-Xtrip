import {Component, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';
import {TourRepo} from './../../../common/repos';
import {TourFilterOptionsPopup} from '../../index';
import {Tour, TourFilterOption} from './../../../common/entities';
import {TourFilter} from '../../../common/entities/tour-filter.entity';
import * as _ from 'lodash';

@Component({
  selector: 'tour-filter-popup',
  templateUrl: './tour-filter.popup.html',
  styleUrls: ['./tour-filter.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class TourFilterPopup extends PopupBase {

  @ViewChild(forwardRef(() => TourFilterOptionsPopup)) private optionPopup: TourFilterOptionsPopup;

  @Input() data: any = null;
  @Input() params: any = {};

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateCounter: EventEmitter<any> = new EventEmitter<any>();

  originalOptions: any = null;
  filterOptions: TourFilterOption = new TourFilterOption();
  filter: TourFilter = new TourFilter({
    prices: [0, 10000000],
    days: [1, 7],
  });

  optionCode: string = '';
  isHaveFilter: boolean = false;
  times: Array<any> = ['Bất kỳ', 'Ban ngày', 'Ban đêm'];

  sliderPriceConfig: any = {
    behaviour: 'hover-snap',
    start: [1, 10000000],
    step: 1000000,
    range: {
      min: 1,
      max: 10000000
    },
    connect: true,
    animate: true
  };

  sliderDayConfig: any = {
    behaviour: 'hover-snap',
    start: [1, 7],
    step: 1,
    range: {
      min: 1,
      max: 7
    },
    connect: true,
    animate: true
  };

  labelSlider = {
    price: {
      min: 0,
      max: 100000
    },
    day: {
      min: 0,
      max: 7
    }
  };

  constructor(private _tourRepo: TourRepo) {
    super();

    this.onInit = this.initial;
  }

  initial = () => {
    if (!!this.data) {
      this.filter = this.utilityHelper.mergeRecursive(this.filter, this.data);
    } else {
      this.onReset();
    }

    this.onUpdateFilter();
  };

  // on initial
  ngOnInit() {
    this.getFilterOptions();
  }

  ngOnChanges() {

    if (!!this.data) {
      this.filter = this.utilityHelper.mergeRecursive(this.filter, this.data);
      this.setRangeSlider();
    }

    this.onUpdateFilter();
  }

  // fn set range slider
  setRangeSlider = () => {

    if (!this.utilityHelper.isNullOrUndefined(this.filter.prices) && this.filter.prices.length) {
      this.labelSlider.price = {
        min: this.filter.prices[0],
        max: this.filter.prices[1]
      };
    }
    if (!this.utilityHelper.isNullOrUndefined(this.filter.days) && this.filter.days.length) {
      this.labelSlider.day = {
        min: this.filter.days[0],
        max: this.filter.days[1]
      };
    }

  };

  // on price change after touch
  onPriceChange = (event: any) => {
    this.filter.prices = event.map(value => Math.round(value / 1000) * 1000);
  };

  //on change price
  onChangePrice = ($event: any = []) => {
    this.labelSlider.price.min = $event[0];
    this.labelSlider.price.max = $event[1];
  };

  // on day change after touch
  onDayChange = (event: any) => {
    this.filter.days = event.map(value => Math.round(value));
  };

  //on change day
  onChangeDay = ($event: any = []) => {
    this.labelSlider.day.min = $event[0];
    this.labelSlider.day.max = $event[1];
  };

  // fn get tour filter-popup-popup options
  getFilterOptions = (): Promise<any> => {

    return this._tourRepo
      .getFilterOptions(this.params)
      .then(
        (res: any) => {
          this.filterOptions = new TourFilterOption(res.data);

          this.setFilterOptions();
        }
      );
  };

  // fn set filter-popup-popup options
  setFilterOptions = () => {
    if (this.filterOptions) {

      // set price
      if (this.filterOptions.prices.length) {


        if (this.filterOptions.prices[0] === this.filterOptions.prices[1]) {
          this.filterOptions.prices[1] = this.filterOptions.prices[0] * 100000;
        }

        if (_.isEmpty(this.data)
          || this.utilityHelper.isNullOrUndefined(this.filter.prices) || !this.filter.prices.length) {
          this.filter.prices = this.filterOptions.prices;
        }

        this.sliderPriceConfig.range.min = this.filterOptions.prices[0];
        this.sliderPriceConfig.range.max = this.filterOptions.prices[1];

        this.sliderPriceConfig.start = this.filter.prices;
        this.labelSlider.price.min = this.filter.prices[0];
        this.labelSlider.price.max = this.filter.prices[1];
      }

      // set day
      if (this.filterOptions.days.length) {

        if (_.isEmpty(this.data)
          || this.utilityHelper.isNullOrUndefined(this.filter.days) || !this.filter.days.length) {
          this.filter.days = this.filterOptions.days;
        }

        this.sliderDayConfig.range.min = this.filterOptions.days[0];
        this.sliderDayConfig.range.max = this.filterOptions.days[1];

        this.sliderDayConfig.start = this.filter.days;
        this.labelSlider.day.min = this.filter.days[0];
        this.labelSlider.day.max = this.filter.days[1];
      }

      // set options
      let options = {};
      for (let index in this.filterOptions.options) {
        let option = this.filterOptions.options[index];
        if (this.utilityHelper.isNullOrUndefined(this.filter.options[option.code])) {
          this.filter.options[option.code] = [];
        }

        options[option.code] = [];
      }

      this.isHaveFilter = true;

      // set original options for counter
      this.originalOptions = {
        sort: this.filterOptions.sorts[0].index,
        prices: this.filterOptions.prices,
        days: this.filterOptions.days,
        time: this.filterOptions.time[0],
        options: options
      };

      this.onUpdateFilter();
    }
  };

  // fn on select sort
/*  onSelectSort = (sortIndex: number = 0) => {
    this.filter.sortIndex = sortIndex;
  };*/

  // fn on select time
  onSelectTime = (time: number = 0) => {
    this.filter.time = time;
  };

  // fn reset filter-popup-popup
  onReset = () => {

    let options = {};

    if (this.filterOptions && this.filterOptions.options.length) {
      for (let index in this.filterOptions.options) {
        options[this.filterOptions.options[index].code] = [];
      }
    }

    this.filter = new TourFilter({
      sortIndex: 0,
      time: 0,
      prices: this.filterOptions.prices || [0, 1000000],
      days: this.filterOptions.days || [1, 6],
      options: options
    });
  };

  // fn submit filter-popup-popup
  onFilter = (): void => {
    this.submit.emit(this.filter);
    this.hide();
  };

  // fn open options
  openSelectOptions = (option: any, code: string = '') => {

    this.optionPopup.title = option.name;
    this.optionPopup.values = option.values;
    this.optionPopup.optionField = option.code;
    this.optionPopup.data = this.filter.options[option.code];

    this.optionCode = option.code;

    this.optionPopup.show();
  };

  // fn on submit options
  onSubmitOptions = ($event: any) => {
    this.filter.options[$event.option] = $event.values;
  };

  // fn update filter-popup-popup
  onUpdateFilter = (): void => {

    this.updateCounter.emit(this.filter.countFilter(this.originalOptions));
  };
}
