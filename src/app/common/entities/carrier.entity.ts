import {environment} from '../../../environments/environment';

export class Carrier {

  code: string = '';
  freeBaggageKg: any = null;
  icon: string = '';
  name: string = '';
  shortName: string = '';

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