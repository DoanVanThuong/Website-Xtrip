import * as _ from 'lodash';
import {TourFilterOption} from "./tour-filter-option.entity";

export class TourSearch {

  arrival: string = '';
  from: string = '';
  to: string = '';
  sortIndex: number = 0;
  title: string = '';
  type: string = '';
  filter: TourFilterOption = null;

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

  // fn get query params
  getQueryParams = (): any => {
    return {
      from: this.from || null,
      to: this.to || null,
      sortIndex: this.sortIndex || 0
    };
  };

  setType = (type: string = 'international'): TourSearch => {
    this.type = type;
    return this;
  };

  getType = (): string => {
    return this.type;
  };

  // fn set sort index
  setSortIndex = (sortIndex: number = 0): TourSearch => {
    this.sortIndex = sortIndex;
    return this;
  };

  // fn get sort index
  getSortIndex = (): number => {
    return this.sortIndex;
  };

  // fn set filter
  setFilter = (filter: TourFilterOption = null): TourSearch => {
    this.filter = filter;
    return this;
  };

  // get filter
  getFilter = (): TourFilterOption => {
    return this.filter;
  };

  // fn set to sort keys
  setKeys = (source: any = {}) => {
    let params = {};

    let exceptions = ['object', 'function'];

    for (let key in source) {

      if (exceptions.indexOf(typeof source[key]) !== -1) {
        continue;
      }

      if (!!TOUR_SEARCH_KEY[key]) {
        params[TOUR_SEARCH_KEY[key]] = source[key];
      } else {
        params[key] = source[key];
      }
    }

    return params;
  };

  // fn get full params
  getKeys = (source: any = {}) => {
    let params = {};

    for (let key in source) {

      let isMatched: boolean = false;
      for (let baseKey in TOUR_SEARCH_KEY) {

        if (TOUR_SEARCH_KEY[baseKey] === key) {

          params[baseKey] = source[key];
          isMatched = true;
          break;
        }
      }

      if (!isMatched) {
        params[key] = source[key];
      }
    }

    return params;
  }

}

export const TOUR_SEARCH_KEY = {
  arrival: 'arr',
  from: 'from',
  to: 'to',
  sortIndex: 'srt',
  title: 'ttl',
  type: 'type'
};
