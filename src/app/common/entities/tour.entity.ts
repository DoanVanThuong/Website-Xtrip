import { Photo } from './photo.entity';
import { Hotel } from './hotel.entity';
import { Supplier } from './supplier.entity';
import * as moment from "moment";

export class Tour {

  alias: string = '';
  code: string = '';
  name: string = '';
  photo: Photo = new Photo();
  url: string = '';
  nights: number = 0;

  originalPrice: number = 0;
  sellingPrice: number = 0;
  arrivalCode: string = '';
  arrivalPlace: string = '';
  arrivalAlias: string = '';
  arriveCode: string = '';
  arrivePlace: string = '';
  available: number = 0;
  countryCode: string = '';
  currency: string = '';
  days: number = 0;
  departCode: string = '';
  departDate: string = '';
  returnDate: string = '';
  departDates: Array<string> = [];
  departName: string = '';
  journey: string = '';
  landmarks: Array<any> = [];
  percentDiscount: number = 10;
  points: number = 0;
  rating: number = 0;
  reviews: number = 0;
  supplier: Supplier = new Supplier();
  transportType: string = '';
  type: number = 0;
  fakeAvailable: number = 0;
  adultPrice: number = 0;
  childPrice: number = 0;
  departPlace: string = '';
  description: string = '';
  infantPrice: number = 0;
  isInternational: boolean = false;
  photos: Array<Photo> = [];
  quantity: number = 0;
  services: Array<any> = [];
  summary: string = '';
  topics: Array<any> = [];
  id: string = '';
  highlights: any[] = [];

  policy: string = '';
  policyContent: TourPolicy = new TourPolicy();

  terms: string = '';
  termsContent: TourTerm = new TourTerm();

  coupon: TourCoupon = new TourCoupon();
  hashTags: Array<HashTag> = [];

  feedbackContact: any = {
    fbLink: '',
    hotline: '',
    zaloLink: ''
  };

  aliasCode: string = '';
  href: string = '';

  flashDeal: {
    adultPrice: number,
    childPrice: number,
    infantPrice: number,
    from: string,
    to: string
  } = {
      adultPrice: 0,
      childPrice: 0,
      infantPrice: 0,
      from: '',
      to: ''
    };

  expiredTime: any = moment().add(1, 'month');

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo', 'photos', 'supplier'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });

      // custom
      this.aliasCode = `${this.alias}.${this.code}.html`;
      this.href = `/tour/${this.aliasCode}`;

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.photos) {
        this.photos = data.photos.map(photo => new Photo(photo));

        if (!data.photo) {
          this.photo = this.photos[0];
        }
      }

      if (!!data.supplier) {
        this.supplier = new Supplier(data.supplier);
      }

      if (!!data.coupon) {
        this.coupon = new TourCoupon(data.coupon);
      }

      if (!!data.hashTags) {
        this.hashTags = (data.hashTags || []).map(hashtag => new HashTag(hashtag));
      }

      if (!!data.policyContent) {
        this.policyContent = new TourPolicy(data.policyContent);
      }

      if (!!data.termsContent) {
        this.termsContent = new TourTerm(data.termsContent);
      }

      // mini hack
      if (!this.fakeAvailable && !!this.available) {
        this.fakeAvailable = this.available;
      }

      this.arrivalCode = this.arriveCode;
      this.arrivalPlace = this.arrivePlace;
    }
  }

  // fn get code from aliascode
  getCode = (aliasCode: string = null): string => {

    if (!aliasCode) {
      return null;
    }

    let keys = aliasCode.split('.');
    if (keys.length > 1) {
      return keys[keys.length - 2];
    }

    return null;
  }
}

export class TourPackage {

  departInfo: any = {
    transportSupplier: new Supplier(),
    transportTypeIcon: new Photo()
  };
  hotels: Array<Hotel> = [];
  returnInfo: any = {
    transportSupplier: new Supplier(),
    transportTypeIcon: new Photo()

  };
  transportClass: string = null;
  transportType: string = null;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['hotels'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          // existing key and key not in keys list

          self[key] = val;
        }
      });


      if (!!data.hotels) {
        this.hotels = data.hotels.map(hotel => new Hotel(hotel));
      }

    }
  }
}

export class TourJourney {

  summary: any = null;
  details: any[] = [];
  showNumberItem: number = 0;

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

export class TourCoupon {

  couponCode: string = '';
  couponName: string = '';
  discountPercentage: number = 0;
  discountAmount: number = 0;
  maxDiscount: number = 0;
  startDate: string = '';
  endDate: string = '';
  available: boolean = false;
  usePercentage: boolean = false;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });

    }
  }
}

export class HashTag {

  keyWord: string = '';
  url: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });

    }
  }
}

export class TourPolicy {

  include: string = '';
  exclude: string = '';
  surcharges = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });

    }
  }
}

export class TourTerm {

  refund: string = '';
  visa: string = '';
  notes: string = '';

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          // existing key and key not in keys list
          self[key] = val;
        }
      });

    }
  }
}
