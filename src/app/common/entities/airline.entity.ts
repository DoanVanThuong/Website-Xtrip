import {environment} from '../../../environments/environment';

export class Airline {

  code: string = null;
  freeBaggageKg: number = 0;
  icon: string = null;
  name: string = null;
  shortName: string = null;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;
      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (data.icon.indexOf('//') === -1) {
        this.icon = `${environment.API_STATIC_URL}${data.icon}`;
      }
    }
  }
}