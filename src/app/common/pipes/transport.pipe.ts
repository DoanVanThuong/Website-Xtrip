import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'transport'})
export class TransportPipe implements PipeTransform {
  transform(value: string, ...args): string {

    let transport = '';

    if (!!value) {


      switch (value.toLowerCase()) {
        case 'flight': {
          transport = 'Chuyến bay';
          break;
        }
        case 'yacht':
        case 'train': {
          transport = 'Chuyến tàu';
          break;
        }
        case 'car': {
          transport = 'Chuyến xe';
          break;
        }
      }
    }

    return transport;
  }
}