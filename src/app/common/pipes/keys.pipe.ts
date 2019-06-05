import {Pipe, PipeTransform} from '@angular/core';
import {UtilityHelper} from '../helpers';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {

  transform(arr: any[], args: any): any {

    let keys = [];

    for(let key in arr){
      keys.push({
        key,
        value: arr[key]
      });
    }

    return keys;
  }
}