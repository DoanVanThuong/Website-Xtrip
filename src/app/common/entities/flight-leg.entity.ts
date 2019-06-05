export class FlightLeg {

  index: number = 0;
  carrier: string = '';
  classCode: string = '';
  departTime: string = '';
  destination: string = '';
  flightDuration: number = 0;
  flightNumber: string = '';
  landingTime: string = '';
  origin: string = '';
  timePending: number = 0;
  breakTime: string = '';

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