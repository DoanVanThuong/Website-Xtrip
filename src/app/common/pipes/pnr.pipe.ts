import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pnr' })
export class PnrPipe implements PipeTransform {
    transform(value: string = '', args: string[]): any {
        return value.replace("|", " - ") || value;
    }
}