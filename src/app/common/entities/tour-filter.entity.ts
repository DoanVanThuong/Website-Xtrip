import {UtilityHelper} from '../helpers';

export class TourFilter {

  // sortIndex: number = 0;
  time: number = 0;
  prices: number[] = null;
  days: number[] = null;
  options: any = {};

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });
    }
  }

  // fn set options
  setOptions = (options: any = {}): TourFilter => {
    this.options = options;
    return this;
  };

  // fn get options
  getOptions = (field: string = ''): any => {
    if (this.options.hasOwnProperty(field)) {
      return this.options[field];
    }
    return this.options;
  };

  // fn count selected filter-popup-popup
  countFilter = (originalOptions: any = {
    sort: 0,
    prices: [],
    days: [],
    time: 0,
    options: {}
  }): number => {

    let util = new UtilityHelper();
    let counter = 0;

    if (!originalOptions) {
      return 0;
    }

    /*if (!!this.sortIndex) {
      counter++;
    }*/

    if (!!this.time) {
      counter++;
    }

    if (!util.isNullOrUndefined(this.prices)
      && this.prices.length
      && (this.prices[0] !== originalOptions.prices[0]
        || this.prices[1] !== originalOptions.prices[1])) {
      counter++;
    }

    if (!util.isNullOrUndefined(this.days)
      && this.days.length
      && (this.days[0] !== originalOptions.days[0]
        || this.days[1] !== originalOptions.days[1])) {
      counter++;
    }

    for (let key in this.options) {

      if (!!this.options[key].length) {
        counter++;
      }
    }

    return counter;
  };
}
