import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {CWEEKS} from '../../app.constants';

/*
 * Converts newlines intro html breaks
 */
@Pipe({name: 'startTime'})
export class StartTimePipe implements PipeTransform {
  transform(datetime: string, args: string[]): string {

    let day = moment(datetime).day();

    return `${CWEEKS[day]}, ${ moment(datetime).format('DD/MM')}`;
  }
}
