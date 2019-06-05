import {Component, EventEmitter, Input, Output, ViewEncapsulation, ViewChild, forwardRef} from '@angular/core';
import {PopupBase} from './../../popup/popup.base';
import {HotelRepo} from './../../../common/repos';
import {HotelFilter, HotelFilterOptions} from './../../../common';
import * as _ from 'lodash';

@Component({
  selector: 'hotel-filter-popup',
  templateUrl: './hotel-filter.popup.html',
  styleUrls: ['./hotel-filter.popup.less'],
  encapsulation: ViewEncapsulation.None
})
export class HotelFilterPopup extends PopupBase {

  @Input() params: {};
  @Input() data: any;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateCounter: EventEmitter<any> = new EventEmitter<any>();

  @Output() sortData: EventEmitter<any> = new EventEmitter<any>();

  originalOptions: any = null;
  filterOptions: HotelFilterOptions = new HotelFilterOptions();
  filter: HotelFilter = new HotelFilter({
    //sortIndex: 0,
    prices: [],
    stars: [],
    others: {}
  });

  stars: Array<any> = [];
  isHaveFilter = false;
  sliderConfig: any = {
    behaviour: 'hover-snap',
    start: [0, 5000000],
    step: 100000,
    range: {
      min: 0,
      max: 5000000
    },
    connect: true,
    animate: true
  };

  optionCode: string = '';

  labelSlider = {
    price: {
      min: 0,
      max: 5000000
    }
  };

  constructor(private _hotelRepo: HotelRepo) {
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

  };

  // get Filter Options
  getFilterOptions = (): Promise<any> => {

    return this._hotelRepo
      .getFilterOperations(this.params)
      .then(
        (res: any) => {
          this.filterOptions = new HotelFilterOptions(res.data);
          this.sortData.emit(res.data.sorts);
          this.setFilterOptions();
        },
        (errors: any) => {
        }
      );
  };

  // fn set filter-popup-popup options
  setFilterOptions = (): void => {
    if (this.filterOptions) {

      // set prices
      if (this.filterOptions.prices && !!this.filterOptions.prices.length) {

        if (this.utilityHelper.isNullOrUndefined(this.filter.prices) || !this.filter.prices.length) {
          this.filter.prices = this.filterOptions.prices;
        }

        this.sliderConfig.range.min = this.filterOptions.prices[0];
        this.sliderConfig.range.max = this.filterOptions.prices[0] !== this.filterOptions.prices[1] ? this.filterOptions.prices[1] : (this.filterOptions.prices[1] + 1000000);

        this.sliderConfig.start = this.filter.prices;
        this.labelSlider.price.min = this.filter.prices[0];
        this.labelSlider.price.max = this.filter.prices[1];
      }

      // set options
      let options = {};
      for (let index in this.filterOptions.options) {
        let option = this.filterOptions.options[index];
        if (this.utilityHelper.isNullOrUndefined(this.filter.others[option.code])) {
          this.filter.others[option.code] = [];
        }

        options[option.code] = [];
      }

      this.isHaveFilter = true;

      // set original options for counter
      this.originalOptions = {
        sort: this.filterOptions.sorts[0].index,
        prices: this.filterOptions.prices,
        stars: this.filterOptions.stars,
        others: options
      };
      this.onUpdateFilter();
    }
  };

  //---------------Filter by Price--------------
  //on change price event after touch
  onPriceChange = ($event: any = []) => {
    this.filter.prices = $event;
  };

  //on change price
  onChangePrice = ($event: any = []) => {
    this.labelSlider.price.min = $event[0];
    this.labelSlider.price.max = $event[1];
  };

  //--------------hotel stars-----------------

  onSelectStar = (currentStar: number = 0): void => {
    if (!_.includes(this.filter.stars, currentStar)) {
      this.filter.stars.push(currentStar);
    } else {
      this.filter.stars.splice(this.filter.stars.findIndex(item => item === currentStar), 1);
    }
  };

  //Active selected item stars
  isStarSelected = (list: Array<any> = [], item: any = null): boolean => {
    if (_.includes(list, item)) {
      return true;
    }
    else {
      return false;
    }
  };

  //-----------------hotel options----------------
  onSelectOptionItem(item, optionGroup) {
    let index = this.filter.others[optionGroup].indexOf(item);
    if (index !== -1) {
      this.filter.others[optionGroup].splice(index, 1);
    } else {
      this.filter.others[optionGroup].push(item);
    }
  }

  //check active item option
  checkIsActiveOptionItem(item, optionGroup) {
    return _.includes(this.filter.others[optionGroup], item) ? true : false;
  }

  // fn reset filter-popup-popup
  onReset = () => {

    let options = {};

    if (this.filterOptions && this.filterOptions.options.length) {
      for (let index in this.filterOptions.options) {
        options[this.filterOptions.options[index].code] = [];
      }
    }

    this.filter = new HotelFilter({
      prices: this.filterOptions.prices || [0, 1000000],
      stars: [],
      others: options
    });
  };
  // fn submit filter-popup-popup
  onFilter = (): void => {
    this.submit.emit(this.filter);
    this.hide();
  };

  // fn update filter-popup-popup
  onUpdateFilter = (): void => {
    this.updateCounter.emit(this.filter.countFilter(this.originalOptions));
  };

}
