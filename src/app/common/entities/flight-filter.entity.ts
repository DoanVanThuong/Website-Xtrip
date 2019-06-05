import * as _ from 'lodash';
import {UtilityHelper} from '../helpers';

export class FlightFilter {

  sort: any = null;
  depart: any = [0, 24];
  landing: any = [0, 24];
  points: Array<any> = [];
  carriers: Array<string> = [];

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

  // fn count filter-popup-popup which is selected
  countFilter = (originalOptions: any = null): number => {

    if(!originalOptions){
      return 0;
    }

    let counter = 0;
    let util = new UtilityHelper();

    if (!util.isNullOrUndefined(this.sort)) {
      counter++;
    }

    if (!util.isNullOrUndefined(this.depart)
      && this.depart.length
      && (this.depart[0] !== originalOptions.depart[0]
        || this.depart[1] !== originalOptions.depart[1])) {
      counter++;
    }

    if (this.landing.length == 2
      && (this.landing[0] !== originalOptions.landing[0]
        || this.landing[1] !== originalOptions.landing[1])) {
      counter++;
    }

    if (!!this.points.length && this.points[0] !== originalOptions.point) {
      counter++;
    }

    if (!!this.carriers.length && this.carriers[0] !== originalOptions.carrier) {
      counter++;
    }

    return counter;
  };
}