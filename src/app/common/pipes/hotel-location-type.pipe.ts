import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hotelLocationType'})
export class HotelLocationTypePipe implements PipeTransform {

  transform(type: string): string {
    let data = type.toLowerCase();
    return data === 'hotel' ? 'Khách sạn' : 'Thành phố'
  }
}