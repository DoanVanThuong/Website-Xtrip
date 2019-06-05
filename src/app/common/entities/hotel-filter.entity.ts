import {UtilityHelper} from '../helpers';

export class HotelFilter {

  sortIndex: number = 0;
  prices: any = null;
  stars: any = [];
  others: any = {};

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });
    }
  }

  // fn count selected filter-popup-popup
  countFilter = (originalOptions: any = {
    sort: 0,
    prices: [],
    start: [1, 2, 3, 4, 5],
    options: {}
  }): number => {

    if (!originalOptions) {
      return 0;
    }

    let util = new UtilityHelper();
    let counter = 0;

    if (this.sortIndex !== 0) {
      counter++;
    }

    if (!util.isNullOrUndefined(this.prices)
      && !!this.prices.length
      && (this.prices[0] !== originalOptions.prices[0]
        || this.prices[1] !== originalOptions.prices[1])
    ) {
      counter++;
    }

    if (this.stars.length !== 5) {
      counter++;
    }

    for (let key in this.others) {
      if (!!this.others[key].length) {
        counter++;
      }
    }

    return counter;
  };
}
