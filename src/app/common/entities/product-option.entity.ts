export class ProductOption {

  allowChildren: boolean = false;
  allowInfant: boolean = false;
  allowSeniors: boolean = false;
  available: boolean = false;

  cancellationPolicies: any[] = [];
  options: any = {
    perBooking: [],
    perPax: []
  };
  timeslots: any[] = [];

  description: string = '';
  id: string = '';
  notes: string = '';
  title: string = '';


  maxAdultAge: number = 100;
  maxChildAge: number = 12;
  maxInfantAge: number = 0;
  maxSeniorAge: number = 0;

  minAdultAge: number = 0;
  minChildAge: number = 0;
  minInfantAge: number = 0;
  minSeniorAge: number = 0;

  maxPax: number = 0;
  minPax: number = 0;

  maxSeniors: number = 0;
  maxChildren: number = 0;

  minChildren: number = 0;
  minSeniors: number = 0;

  originalPrice: number = 0;
  points: number = 0;
  sellingPrice: number = 0;

  remark: any = null;

  meetingLocation: string = null;
  meetingAddress: string = null;
  meetingTime: string = null;

  constructor(data?: any) {

    if (!_.isEmpty(data)) {
      let self = this;

      let keys = ['options'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.options) {
        if (!!data.options.perBooking) {
          this.options.perBooking = data.options.perBooking.map(item => new ProductPerBooking(item));
        }

        if (!!data.options.perPax) {
          this.options.perPax = data.options.perPax.map(item => new ProductPerPax(item));
        }
      }
    }
  }
}

export class ProductPerBooking {
  addons: boolean = false;
  description: string = null;
  formatRegex: any = null;
  inputType: number = 0;
  items: any = [];
  name: string = '';
  price: number = 0;
  required: boolean = false;
  uuid: string = null;
  validFrom: any = null;
  validTo: any = null;


  constructor(data?: any) {

    if (!_.isEmpty(data)) {
      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.items) {
        // this.items = data
      }
    }
  }
}

export class ProductPerPax {

  description: string = null;
  formatRegex: string = null;
  inputType: number = 0;
  items: any[] = []; // [{label: "Nam", value: "Male", price: 0}, {label: "Nữ", value: "Female", price: 0}]
  name: string = null;
  price: number = 0;
  required: boolean = false;
  uuid: string = '';
  validFrom: any = null;
  validTo: any = null;
  
  // custom field
  selectedValue: any = null;

  constructor(data?: any) {

    if (!_.isEmpty(data)) {
      let self = this;

      let keys = [];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.items) {
        // this.items = data
      }
    }
  }
}