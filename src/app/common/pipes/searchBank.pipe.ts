import {Pipe, PipeTransform} from '@angular/core';
import {Bank, PaymentOption} from '../index';

@Pipe({
  name: 'SearchBank',
  pure: false
})
export class SearchBank implements PipeTransform {

  transform(value: PaymentOption[] = [], args?): Array<any> {

    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(bank => {
        if (bank) {
          return bank.name.search(searchText) !== -1 ||
            bank.code.search(searchText) !== -1;
        }

      });
    }
  }
}
