import {Pipe, PipeTransform} from '@angular/core';
import {CWEEKS_SHORT} from '../../app.constants';
import * as moment from 'moment';

@Pipe({name: 'returnDate'})
export class ReturnDatePipe implements PipeTransform {

  transform(date: string = '', format: string = 'DD/MM/YYYY'): string {
    let day = moment(date);

    return `${CWEEKS_SHORT[day.day()]}, ${day.format(format)}`;
  }
}