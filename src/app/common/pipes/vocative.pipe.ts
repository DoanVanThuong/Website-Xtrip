import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'vocative'})
export class VocativePipe implements PipeTransform {

  transform(title: string, type: string = ''): string {

    switch (title) {
      case 'MR': {
        return 'Ông';
      }
      case 'MSTR': {
        return 'Bé Trai';
      }
      case 'MISS': {
        if (type === 'ADT') {
          return 'Cô';
        }
        return 'Bé Gái';
      }
      case 'MRS': {
        return 'Bà';
      }

    }

    return '';
  }

  convert(money: string, locale: string = 'vn-VN') {
    if (typeof (money) === 'string') {
      money = this.removeChar(money, ',');
    }
    let l10nEN = new Intl.NumberFormat(locale);
    if (money !== '') {
      return l10nEN.format(+money);
    }
    return '0';
  }


  removeChar(money: string, char: string) {

    let result = '';
    switch (char) {
      case ',':
        result = money.replace(/,/g, '');
        break;
      case '.':
        result = money.replace(/./g, '');
        break;
      default:
        result = money;
        break;
    }
    return result;
  }

}