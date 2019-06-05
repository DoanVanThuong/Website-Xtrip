export class Notification {

  code: string = '';
  subject: string = '';
  body: string = '';
  type: number = 0;
  link: string = '';
  opened: boolean = false;
  time: string = '';
  createdDate: string = '';

  constructor(data: any) {
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