export class TourFilterOption {

  sortIndex: number = null;
  sorts: Array<ISort> = [];
  prices: Array<number> = [0, 0];
  days: Array<number> = [];
  time: Array<number> = [];
  options: Array<IFilterOption> = [];

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
}

export interface ISort {
  index: number;
  name: string;
}

export interface IFilterOption {
  code: string;
  name: string;
  order:number;
  values: Array<IFilterOptionValue>;
}

export interface IFilterOptionValue {
  code: string;
  icon: string;
  name: string;
}
