import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'distance'})
export class DistancePipe implements PipeTransform {
  transform(metre: number = 0, unit: string = 'm', digit: number = 2): any {

    let buffer = 1;

    switch (unit.toLowerCase()) {
      case 'km': {
        buffer = 1000;
        break;
      }
      case 'hm': {
        buffer = 100;
        break;
      }
      case 'dam': {
        buffer = 10;
        break;
      }
      case 'dm': {
        buffer = 1 / 10;
        break;
      }
      case 'cm': {
        buffer = 1 / 100;
        break;
      }
      case 'mm': {
        buffer = 1 / 1000;
        break;
      }
      case 'in':
      case 'inch': {
        buffer = 1 / 39.3701;
        break;
      }
      case 'y':
      case 'yard': {
        buffer = 1 / 1.09361;
        break;
      }
      case 'mil':
      case 'mile': {

        break;
      }
      default: {
        buffer = 1;
        break;
      }
    }

    return `Khoảng ${(metre / buffer).toFixed(digit)}${unit}`;
  }
}