import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/*
 * Converts newlines intro html breaks
 */
@Pipe({name: 'newline'})
export class NewlinePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: string = '', args: string[]): any {
    return String(value || '').replace(/(?:\r\n|\r|\n|\\n|\\r)/g, '<br/>');
  }
}
