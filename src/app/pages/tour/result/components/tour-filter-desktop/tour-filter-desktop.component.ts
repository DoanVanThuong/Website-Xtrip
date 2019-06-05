import {Component, Output, EventEmitter, Input, ViewEncapsulation} from '@angular/core';
import {AppBase} from '../../../../../app.base';
import {HotelFilterOptions, TourFilter, TourFilterOption, TourRepo, TourSearch} from '../../../../../common';

@Component({
  selector: 'tour-filter-desktop',
  templateUrl: './tour-filter-desktop.component.html',
  styleUrls: ['./tour-filter-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class TourFilterDesktopComponent extends AppBase {

  @Input() params: TourSearch = null;
  @Input() filterOptions: TourFilterOption = null;

  @Output() onChangeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  times: Array<any> = ['Bất kỳ', 'Ban ngày', 'Ban đêm'];
  showNumberOther: number = 4;

  selectedOption: any = {};

  filter: TourFilter = new TourFilter({
    prices: [1, 10000000],
    days: [1, 7]
  });

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

  labelSlider: any = {
    price: {
      min: 0,
      max: 100000
    },
    day: {
      min: 0,
      max: 7
    }
  };

  constructor() {
    super();
  }

  ngOnChanges() {
    if (!!this.filterOptions) {
      this.setFilterOptions();
      this.setRangeSlider();
    }

    this.onHandleParams(this.params);
  }

  ngOnInit() {

  }

  //fn get options in params
  onHandleParams = (params: any = {}): void => {

    for (let key in params) {
      let value = params[key];

      switch (key.toLowerCase()) {
        case 'time': {
          this.filter[key] = isNaN(value) ? value : Number(value);
          break;
        }
        case 'prices':
        case 'days': {
          this.filter[key] = value.split(',').map((value) => {
            return isNaN(value) ? value : Number(value);
          });
          break;
        }
        default: {

          if (!!_.find(this.filterOptions.options, {code: key})) {

            this.filter.options[key] = params[key].split(',')
              .map((value: number) => {
                return isNaN(value) ? value : Number(value);
              });
          }
          break;
        }
      }
    }
  };

  // on price change after touch
  onPriceChange = (event: any) => {
    this.filter.prices = event;
    this.onChange.emit(this.filter);
  };

  //on change price update label
  onChangePrice = ($event: any = []) => {
    this.labelSlider.price.min = $event[0];
    this.labelSlider.price.max = $event[1];
  };


  // fn set range slider
  setRangeSlider = () => {
    this.labelSlider.price.min = this.filterOptions.prices[0] | 0;
    this.labelSlider.price.max = this.filterOptions.prices[1] | 0;

    this.labelSlider.day.min = this.filterOptions.days[0] || 0;
    this.labelSlider.day.max = this.filterOptions.days[1] || 7;
  };

  // on day change after touch
  onDayChange = (event: any) => {
    this.filter.days = event.map(value => Math.round(value));
    this.onChange.emit(this.filter);
  };

  //on change day
  onChangeDay = ($event: any = []) => {
    this.labelSlider.day.min = $event[0];
    this.labelSlider.day.max = $event[1];
  };

  //fn select time
  onSelectTime = (time: number = 0) => {
    if (Number(this.filter.time) === Number(time)) {
      this.filter.time = 0;
    } else {
      this.filter.time = time;
    }
    this.onChange.emit(this.filter);
  };

  // fn set filter options
  setFilterOptions = (): void => {
    if (!!this.filterOptions) {

      // set prices
      if (this.filterOptions.prices.length) {
        if (this.filterOptions.prices) {
          this.filter.prices = this.filterOptions.prices;
          this.sliderPriceConfig.start = this.filterOptions.prices;
        } else {
          this.sliderPriceConfig.start = this.filter.prices = this.filterOptions.prices;
        }

        this.sliderPriceConfig.range.min = this.filterOptions.prices[0];
        this.sliderPriceConfig.range.max = this.filterOptions.prices[0] === this.filterOptions.prices[1] ? this.filterOptions.prices[1] + 1000000 : this.filterOptions.prices[1];

      }

      // set days
      if (this.filterOptions.days.length) {
        if (this.filterOptions.days) {
          this.filter.days = this.filterOptions.days;
          this.sliderDayConfig.start = this.filterOptions.days;
        } else {
          this.sliderDayConfig.start = this.filter.days = this.filterOptions.days;
        }
        this.sliderDayConfig.range.min = this.filterOptions.days[0] || 0;
        this.sliderDayConfig.range.max = this.filterOptions.days[1] || 7;
      }

      //set time
      this.filter.time = Number(this.filterOptions.time) || 0;
    }
  };

  // fn on select filter options
  onSelectOption = ($event: any = null, optionCode: string = null, optionItem: any = null): any => {

    if (!this.filter.options.hasOwnProperty(optionCode)) {
      this.filter.options[optionCode] = [];
    }

    if ($event.target.checked) {
      // push if not existing
      this.filter.options[optionCode].push(optionItem.code);
    } else {
      // remove when it get current code

      this.filter.options[optionCode] = _.filter(this.filter.options[optionCode], (value: any) => {
        return value !== optionItem.code;
      });
    }

    this.onChange.emit(this.filter);
  };

  // fn reset filter
  onResetFilter = (): void => {
    this.sliderPriceConfig.range.min = this.filterOptions.prices[0];
    this.sliderPriceConfig.range.max = this.filterOptions.prices[1];

    this.sliderDayConfig.range.min = this.filterOptions.days[0];
    this.sliderDayConfig.range.max = this.filterOptions.days[1];

    this.sliderPriceConfig.start = [0, 1000000];

    this.filter = new TourFilter({
      sortIndex: 0,
    });

    this.onChange.emit(this.filter);
  };


  //fn check option in params
  onDetectSelectedOptionItem = (options: any = {}, optionItem: any = {}): boolean => {
    return _.includes(this.filter.options[options.code] || [], optionItem.code);
  }
}
