import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
import {UtilityHelper} from '../helpers';

@Pipe({name: 'resizeImage'})
export class ResizeImage implements PipeTransform {

  transform(url: string, width: number = 300, height?: number): any {
    if (url.match(/\?./)) {
      const params: any = url.split('?');
      if (params.length > 2) {
        return url;
      }
    }
    else if (!!height && _.isNumber(height)) {
      return url + `?width=${width}&height=${height}`;
    }
    else {
      return url + `?width=${width}`;
    }
  }
}

@Pipe({name: 'size'})
export class ResizePipe implements PipeTransform {

  transform(url: string = '', width: number = 400, height: number = 0, crop: boolean = false): string {
    let util = new UtilityHelper();

    return util.markImageSize(url, width, height, crop);
  }
}
