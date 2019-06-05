import {Pipe, PipeTransform} from '@angular/core';
import {CPATTERN} from '../../app.constants';

@Pipe({name: 'hideEmailAddress'})
export class HideEmailAddressPipe implements PipeTransform {

  transform(text: string, args?: any): any {
    let reg = CPATTERN.EMAIL;

    if (reg.test(text)) {
      return text.split('@')[0];
    }

    return text;
  }
}
