import {Photo} from "./photo.entity";

export class FreeTour {

  title: string = null;
  depart: string = null;
  return: string = null;

  place: FreeTourItem<FreeTourPlaceItem> = new FreeTourItem<FreeTourPlaceItem>();
  flight: FreeTourItem<FreeTourFlightItem> = new FreeTourItem<FreeTourFlightItem>();
  activity: FreeTourItem<FreeTourActivityItem> = new FreeTourItem<FreeTourActivityItem>();
  hotel: FreeTourItem<FreeTourHotelItem> = new FreeTourItem<FreeTourHotelItem>();

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
}

export class FreeTourItem<T extends Object> {

  title: string = null;
  params: any = null;
  subText: string = null;
  items: Array<T> = [];

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
        this.items = data.items.map(item => new Object(item) as T);
      }
    }
  }
}

export class FreeTourPlaceItem {

  code: string = null;
  name: string = null;
  type: string = null;
  photo: Photo = new Photo();

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

    }
  }
}

export class FreeTourFlightItem {

  name: string = null;
  photo: Photo = new Photo();
  origin: string = null;
  destination: string = null;
  originName: string = null;
  destinationName: string = null;
  price: number = 0;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

    }
  }
}

export class FreeTourHotelItem {

  code: string = null;
  name: string = null;
  type: string = null;
  highlight: string = null;
  photo: Photo = new Photo();
  address: string = null;
  stars: number = null;
  price: number = null;
  discount: number = null;
  nearby: string = null;
  facilities: Array<{
    code: string;
    name: string;
    icon: string;
  }> = [];

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo', 'facilities'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.facilities) {
        this.facilities = data.facilities.map(facility => new Object(facility) as {
          code: string;
          name: string;
          icon: string;
        });
      }

    }
  }
}

export class FreeTourActivityItem {
  code: string = null;
  name: string = null;
  photo: Photo = new Photo();
  price: number = null;
  originalPrice: number = 0;
  instantConfirmation: boolean = false;
  dateNotice: string = null;
  notes: Array<string> = [];
  discount: number = 0;
  tags: Array<{
    text: string;
    type: string;
  }>;


  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['photo', 'tags'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.photo) {
        this.photo = new Photo(data.photo);
      }

      if (!!data.tags) {
        this.tags = data.tags.map(tag => {

          return new Object(tag) as {
            text: string;
            type: string;
          }
        });
      }

    }
  }
}

