export class RewardPoint {

  point: number = 0;
  type: number = null;
  service: number = null;
  name: string = '';
  time: string = '';
  orderCode: string = '';
  serviceName: string = '';
  positive: boolean = true;

  constructor(data?: any) {
    if (!_.isEmpty(data)) {

      let self = this;

      _.each(data, function (val, key) {
        if (self.hasOwnProperty(key)) {
          self[key] = val;
        }
      });
    }

    if (!!data.service) {
      switch (data.service) {
        case 1: {
          this.serviceName = 'Vé máy bay';
          break;
        }
        case 2: {
          this.serviceName = 'Khách sạn';
          break;
        }
        case 3: {
          this.serviceName = 'Tour du lịch';
          break;
        }
      }
    }

    if (!!data.type) {
      switch (data.type) {
        case 2:
        case 3: {
          this.positive = false;
          break;
        }
        default: {
          this.positive = true;
          break;
        }
      }
    }
  }
}