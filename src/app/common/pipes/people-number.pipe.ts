import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'peopleNumber'})
export class PeopleNumberPipe implements PipeTransform {

  transform(data: any = {}): string {
    return `${(!!data.adults ? data.adults + ' người lớn' : '') + (!!data.children ? ', '+ data.children + ' trẻ em' : '') + (!!data.infants ? ', ' + data.infants + ' em bé' : '')}`;
  }

}