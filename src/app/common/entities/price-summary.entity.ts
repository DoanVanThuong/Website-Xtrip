import * as _ from 'lodash';

export class PriceSumary {

  summaries: Array<Summary> = [];
  totalAmount: number = 0;

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['summaries'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.summaries) {
        this.summaries = data.summaries.map(summary => new Summary(summary));
      }

    }
  }
}

export class Summary {
  groupItem: GroupItem = new GroupItem();

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });

      if (!!data.groupItem) {
        this.groupItem = new GroupItem(data.groupItem);
      }
    }
  }
}

export class GroupItem {

  detailItems: Array<DetailItem> = [];

  constructor(data: any = {}) {
    if (!_.isEmpty(data)) {

      let self = this;

      let keys = ['detailItems'];

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key) && keys.indexOf(key) === -1) {
          self[key] = val;
        }
      });

      if (!!data.detailItems) {
        this.detailItems = data.detailItems.map(detailItem => new DetailItem(detailItem));
      }
    }
  }
}

export class DetailItem {

  title: string = '';
  price: number = 0;

  constructor(data: any = {}) {
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