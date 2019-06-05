export class TourDeposit {
  code: string = '';
  title: string = '';
  amount: number = 0;
  note: string = '';

  constructor(data?: any) {
    let self = this;
    _.each(data, (val, key) => {
        if (self.hasOwnProperty(key)) {
            self[key] = val;
        }
    })
}
}