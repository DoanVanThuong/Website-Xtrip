import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'highlight'})
export class Highlight implements PipeTransform {

  transform(text: string, search): string {

    var regex = new RegExp(search || '', 'gi');
    return search ? (text || '').replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}