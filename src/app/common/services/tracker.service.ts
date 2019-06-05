import {Injectable} from '@angular/core';

declare var _: any;

@Injectable()
export class TrackerService {

  steps: Array<any> = [];

  constructor() {
  }

  push = (item: any): void => {
    this.steps.push(item);
  };

  get = (key: string = ''): any => {
    return _.find(this.steps, (step: any) => {
      return step.key === key;
    });
  };

  remove = (key: string) => {

  };

  clear = () => {
    this.steps = [];
  };

}