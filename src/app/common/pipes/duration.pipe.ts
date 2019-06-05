import {Pipe, PipeTransform} from '@angular/core';
import {UtilityHelper} from '../helpers';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

  transform(timestamp: number = 0, args: any): string {

    let utilityHelper = new UtilityHelper();
    return utilityHelper.durationTime(timestamp);
  }
}