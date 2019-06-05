import {Pipe, PipeTransform} from '@angular/core';
import {UtilityHelper} from '../helpers';

@Pipe({name: 'time'})
export class TimePipe implements PipeTransform {

  transform(time: any = 0, format: string = '#h#p'): string {

    let util = new UtilityHelper();
    if (util.isNullOrUndefined(time)) {
      return '';
    }

    let mod = Number(time) % 1;
    return `${Math.floor(time)}h${mod !== 0 ? (Math.round(mod * 60) + 'p') : ''}`;
  }
}