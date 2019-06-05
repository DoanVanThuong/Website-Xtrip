import {Pipe, PipeTransform} from '@angular/core';
import {UtilityHelper} from '../helpers';

@Pipe({name: 'currencyMoney'})
export class CurrencyMoneyPipe implements PipeTransform {

  transform(number: string, currency: string = 'đ', char: string = '.', decimal: number = 0): string {

    let util = new UtilityHelper();
    return `${util.formatCurrency(Number(number), char)}${currency}`;
  }
}