import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {CAPP, CWEEKS} from '../../app.constants';

@Pipe({name: 'departDate'})
export class DepartDatePipe implements PipeTransform {

  transform(date: string, short: boolean = true, format: string = 'DD/MM'): string {

    let shortList = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
    let fullList = CWEEKS;

    // get day
    let days = short ? shortList : fullList;

    let day = moment(date);

    if (short) {
      return days[day.day()] + ',' + moment(date).format(` ${format}`);
    }

    return `${days[day.day()]}, ${moment(date).format(` ${format}`)}`;
  }
}