import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CWEEKS } from '../../app.constants';

@Pipe({name: 'dateOfWeek'})
export class DateOfWeekPipe implements PipeTransform {

  transform(date: string, short: boolean = true): string {

    let shortList = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
    let fullList = CWEEKS;

    // get day
    let days = short ? shortList : fullList;

    let day = moment(date);

    if (short) {
      return days[day.day()];
    }
    return `${days[day.day()]}`;
  }
}