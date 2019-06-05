import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/*
 * Converts newlines intro html breaks
 */
@Pipe({name: 'priceText'})
export class PriceTextPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(input: any = 0, args: string[]): any {


    if(input instanceof String){
      return input;
    }

    let value: number;
    let unit: string = '';

    if (Math.floor(input / 1000000000) > 0) {
      value = Math.floor(input / 1000000000);
      unit = 'tỷ';
    } else if (Math.floor(input / 1000000) > 0) {
      value = Math.floor(input / 1000000);
      unit = 'triệu';
    } else if (Math.floor(input / 1000) > 0) {
      value = Math.floor(input / 1000);
      unit = 'ngàn';
    } else {
      value = input;
    }

    return `${value} ${unit}`;
  }
}
