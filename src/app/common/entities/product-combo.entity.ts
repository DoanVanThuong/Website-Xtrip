export class ProductCombo {

  allowChildren: boolean = false;
  allowInfant: boolean = false;
  allowSeniors: boolean = false;
  available: boolean = false;
  cancellationPolicies: string = null;
  description: string = '';
  id: string = '';
  maxAdultAge: number = null;
  maxChildAge: number = null;
  maxChildren: number = null;
  maxGroup: number = null;
  maxInfantAge: number = null;
  maxPax: number = null;
  maxSeniorAge: number = null;
  maxSeniors: number = null;
  meetingAddress: string = null;
  meetingLocation: string = null;
  meetingTime: string = null;
  minAdultAge: number = null;
  minChildAge: number = null;
  minChildren: number = null;
  minGroup: number = null;
  minInfantAge: number = null;
  minPax: number = null;
  minSeniorAge: number = null;
  minSeniors: number = null;
  notes: string = null;
  options: any = {
    perBooking: [],
    perPax: []
  };
  originalPrice: number = 0;
  points: number = 0;
  remark: any = null;
  sellingPrice: number = 0;
  timeslots: number = null;
  title: string = '';
  validity: any = null;

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {
      let self = this;

      let keys = ['options'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      if (!!data.options) {
        if(!!data.options.perBooking) {
          this.options.perBooking = data.options.perBooking.map(option => new ComboOption(option));
        }
        if(!!data.options.perPax) {
          this.options.perPax = data.options.perPax.map(option => new ComboOption(option));
        }
      }
    }
  }
}

export class ComboOption {

  uuid: string = '';
  name: string = '';
  description: string = '';
  formatRegex: string = null;
  inputType: number = 0;
  validFrom: any = null;
  validTo: any = null;
  items: any = null;
  price: number = 0;
  require: boolean = false;

  constructor(data: any = {}) {
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